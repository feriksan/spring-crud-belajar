import axios from "axios"
import Cookie from "../helper/Cookie.js"

export default class API{
    constructor() {
        this.api_token = null;
        this.client = null;
        this.api_url_production = "http://139.59.81.202:99"
        this.api_url_development = "http://localhost:99"
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
            headers: headers
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
}