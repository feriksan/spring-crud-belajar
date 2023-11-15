package com.example.testcrud.repository;

import com.example.testcrud.entity.FileFolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileFolderRepo extends JpaRepository<FileFolder, Integer> {
    @Query(nativeQuery = true,value = "select * from file_folder where parent=?")
    int findParentLevel(int parent);
    @Query(nativeQuery = true,value = "select * from file_folder where children=?")
    int findChildrenLevel(int children);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "insert into folder_tree(parent, folder, depth) select p.parent, c.folder, p.depth + c.depth +1 from folder_tree as p, folder_tree as c where p.folder =? and c.parent =?")
    void saveToTree(Integer parent, Integer child);
}
