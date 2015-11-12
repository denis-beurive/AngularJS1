MAKEFILE_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

clean:
	find $(MAKEFILE_DIR) -name .Ulysses-Group.plist -exec rm -rf {} \;
	find $(MAKEFILE_DIR) -name .DS_Store -exec rm -rf {} \;
