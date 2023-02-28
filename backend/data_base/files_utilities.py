import os


def check_valid_path(path: str) -> bool:
    """Check if valid path is provided"""
    return os.path.exists(path)


def validate_path(function):
    """Decorator for checking valid path when using kw:"path" """
    def sub_dec(*args, **kwargs):

        # check for path keyword argument
        path = kwargs.get("path")
        if not path:
            raise TypeError(
                "must provide path keyword argument using valid_path decorator")

        # check if path is valid and continue
        if not check_valid_path(kwargs.get("path")):
            raise FileNotFoundError(f"path {path} is invalid!")
        return function(*args, **kwargs)

    return sub_dec


@validate_path
def get_all_files_in_dir(*, path: str, file_type: str = "") -> list[str]:
    """Get all files in directory"""
    # get all files by os.walk
    root, _, files = next(os.walk(path))

    # return all the files with the given file_type
    return [os.path.join(root, file) for file in files if f"{file_type}" in file]


@validate_path
def parse_file_name_from_path(*, path: str, file_type: str) -> str:
    """Parse the file name from file path"""
    return path.split("/")[-1].replace(file_type, "")


def get_abs_path(filename: str) -> str:
    """Get absolute path of file"""
    return os.path.join(os.path.dirname(__file__), (filename))
