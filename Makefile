MAKEFILE_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

BACKUP_FILE  := AngularJS1.tar
SEAFILE_FILE := AngularJS1.tar

include $(MAKEFILE_DIR)/../Admin/Makefile.shared


clean:
	find $(MAKEFILE_DIR) -name .Ulysses-Group.plist -exec rm -rf {} \;
	find $(MAKEFILE_DIR) -name .DS_Store -exec rm -rf {} \;

backup:
	tar zcvf - . > "$(DIR_BACKUP)/$(BACKUP_FILE)"

to-seafile:
	$(MAKE) backup
	rm -f "$(DIR_SEAFILE)/$(SEAFILE_FILE)"
	cp "$(DIR_BACKUP)/$(BACKUP_FILE)" "$(DIR_SEAFILE)/$(SEAFILE_FILE)"
