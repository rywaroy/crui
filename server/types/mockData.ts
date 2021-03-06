export interface IMockObject {
    /**API url */
    url: string;
    /**项目的base URL */
    baseUrl?: string;
    /**请求 Method */
    method: 'GET' | 'POST';
    /**Mock 文件夹/文件路径 */
    path: string;
    /**mock 文件名 */
    fileName?: string;
    /**请求函数名 */
    serverName?: string;
    /**请求函数文件路径 */
    serverPath?: string;
}

export interface IMockDataParams extends IMockObject {
    mockObject: Object
}

export interface ICreateServices {
    /**API url */
    url: string;
    /**项目的base URL */
    baseUrl: string;
    /**请求 Method */
    method: 'GET' | 'POST';
    /**Mock 文件夹/文件路径 */
    path: string;
    /**请求函数名 */
    serverName: string;
    /**请求函数文件路径 */
    serverPath: string;
}