"""
libs.strings
By default, uses `en-us.json` file inside the `strings` top-level folder.
If language changes, set `libs.strings.default_locale` and run `libs.strings.refresh()`.
"""
import json

default_locale = "en-us"
cached_strings = {}


def refresh():
    print("Refreshing...")
    global cached_strings
    with open(f"app/strings/{default_locale}.json") as f:
        cached_strings = json.load(f)


def gettext(name):
    return cached_strings[name]


refresh()