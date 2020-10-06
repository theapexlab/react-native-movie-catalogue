import Axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios'

export function getAxiosInstance(): AxiosInstance {
  const axios = Axios.create({
    baseURL: '/api/',
    timeout: 30000,
  })

  return axios
}

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const axios = getAxiosInstance()
  const { data } = await axios.get<T>(url, config)
  return data
}

export async function post<T>(
  url: string,
  requestData?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const axios = getAxiosInstance()
  const { data } = await axios.post<T>(url, requestData, config)
  return data
}
