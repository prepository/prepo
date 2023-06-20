from setuptools import find_packages, setup

setup(
    name="prepo",
    version="0.1.0",
    url="https",
    author="Yogi Seetharaman",
    author_email="name@example.com",
    description="",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    keywords=["visualisation machine learning cool stuff"],
    classifiers=[
        "Intended Audience :: Science/Research",
        "Programming Language :: Python :: 3.6",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),
    license="Unlicensed",
    install_requires=[],
    entry_points={"console_scripts": ["ui=prepo.__main__:cli"]},
    include_package_data=True,
    package_data={"": ["static/*"]},
    python_requires=">=3.6.0",
)
