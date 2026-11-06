from pathlib import Path


def remove_string_from_filenames(
    folder_path: str | Path,
    target_string: str,
    case_sensitive: bool = True,
    dry_run: bool = True,
) -> None:
    """Removes a specified substring from all file names in a directory.

    :param folder_path: Path to the target folder.
    :param target_string: The string or word to remove.
    :param case_sensitive: Whether to match letter case exactly.
    :param dry_run: If True, prints planned changes without renaming.
    """
    directory = Path(folder_path)

    if not directory.is_dir():
        raise NotADirectoryError(f"Directory not found: {directory}")

    if not target_string:
        print("Target string is empty; no changes to make.")
        return

    print(
        f"--- {'DRY RUN (Previewing Changes)' if dry_run else 'APPLYING CHANGES'} ---"
    )

    for item in directory.iterdir():
        if not item.is_file():
            continue

        original_stem = item.stem
        extension = item.suffix

        # Remove the substring (case-sensitive or insensitive)
        if case_sensitive:
            if target_string not in original_stem:
                continue
            new_stem = original_stem.replace(target_string, "")
        else:
            import re

            if not re.search(re.escape(target_string), original_stem, re.I):
                continue
            new_stem = re.sub(
                re.escape(target_string), "", original_stem, flags=re.I
            )

        # Clean up awkward remnants (e.g. leftover double spaces or leading/trailing spaces)
        new_stem = " ".join(new_stem.split()).strip()

        # Fallback if removing the string would leave the filename completely empty
        if not new_stem:
            print(
                f"[SKIP] Removing target leaves empty filename: '{item.name}'"
            )
            continue

        new_filename = f"{new_stem}{extension}"
        destination = directory / new_filename

        if destination == item:
            continue

        if dry_run:
            print(f"[PREVIEW] {item.name} -> {new_filename}")
        else:
            if destination.exists():
                print(
                    f"[SKIP] Target already exists: {new_filename} (from {item.name})"
                )
                continue
            item.rename(destination)
            print(f"[RENAMED] {item.name} -> {new_filename}")


# ---------------- Example Usage ----------------
if __name__ == "__main__":
    folder = "./beti"

    # Step 1: Preview removing "[DRAFT]" from all files
    remove_string_from_filenames(
        folder_path=folder,
        target_string=" - Bethel Mulate",
        case_sensitive=False,
        dry_run=False,  # Set to False to apply
    )