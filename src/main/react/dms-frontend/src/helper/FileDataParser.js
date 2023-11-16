export default class Parser{
    parseFileData(dataFiles){
        const dataList = [];
        dataFiles.forEach(element => {
            const metadataList = [];
            const fileList = [];
            element.fileHistories.forEach(file => {
                file.fileMetadata.forEach(metadata => {
                    metadataList.push(metadata)
                })
                let files = {
                    "id":element.id,
                    "filename": file.filePath,
                    "subfolder":element.subfolder,
                    "fileSize": element.fileSize + element.fileSizeUnit,
                    "dateCreated": file.date_created,
                    "metadata": metadataList
                }
                fileList.push(files)
            })
            const dataCard = {
                "owner": element.fileHistories[0].owner,
                "data": fileList
            };
            dataList.push(dataCard)
        })
        return dataList
    }
}