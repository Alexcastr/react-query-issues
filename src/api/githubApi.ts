import axios from "axios"

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers:{
    Authorization: 'Bearer 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'
  }
})
