from setuptools import setup, find_packages


NAME = "flask_blogger"
VERSION = "0.0.8"
DESCRIPTION = "Blogging Platform built on flask and react"
KEYWORDS = ["Blogging"]

setup(
  name=NAME,
  version=VERSION,
  description=DESCRIPTION,
  keywords=KEYWORDS,
  packages=find_packages(),
  include_package_data=True
)
