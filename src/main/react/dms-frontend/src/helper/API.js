import axios from "axios"
import Cookie from "../helper/Cookie.js"

export default class API{
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url_production = "http://localhost:99"
    }

    init = () => {
        var cookie = new Cookie()
        this.api_token = cookie.getCookie("api_token")
        let headers = {
            Accept: "application/json"
        }

        if(this.api_token){
            headers.Authorization = `Bearer ${this.api_token}`
        }

        this.client = axios.create({
            baseURL: this.api_url_production,
            timeout: 31000,
            headers: headers,
        })

        return this.client
    }

    initBlob = () => {
        var cookie = new Cookie()
        this.api_token = cookie.getCookie("api_token")
        let headers = {
            Accept: "application/json"
        }

        if(this.api_token){
            headers.Authorization = `Bearer ${this.api_token}`
        }

        this.client = axios.create({
            baseURL: this.api_url_production,
            timeout: 31000,
            headers: headers,
            responseType: "blob"
        })

        return this.client
    }

    getMetadaList = (params) => {
        return this.init().get("/metadataMaster/findAll", {params: params})
    }

    addMetada = (params) => {
        return this.init().post("/metadataMaster/create", params)
    }

    addFile = (params) => {
        return this.init().post("/api/v1/filedata/create_new_file", params)
    }

    getFileList = () => {
        return this.init().get("/api/v1/filedata/get_file_by_user")
    }

    login = (params) => {
        return this.init().post("/api/auth/login", params)
    }

    register = (params) => {
        return this.init().post("/api/auth/register", params)
    }

    download = (params) => {
        return this.initBlob().get("/uploadFile/downloadFile/"+params)
    }

    preview =(params) => {
        return this.initBlob().get("/uploadFile/downloadFile/"+params)
    }

    delete = (params) => {
        return this.init().delete("/api/v1/filedata/deleteFile/" +params)
    }

    getDir = () =>{
        return this.init().get("/api/v1/filedata/get_root_folder")
    }

    getSubDir = (params) => {
        return this.init().get("filedata/get_folder_structure/" + params)
    }

    addFolder = (params) => {
        return this.init().post("/api/v1/filedata/create_new_dir", params)
    }

    getFileAndDir = (params) =>{
        return this.init().get("/api/v1/filedata/get_file_and_folder/" + params)
    }
}