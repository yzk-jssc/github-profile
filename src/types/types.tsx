
export interface currentProfileI{
    readonly id?:number;
    readonly name?: string;
    readonly login:string;
    readonly location?:string;
    readonly publicRepositories:number;
    readonly avatar_url?:string;
    readonly repos?: latestReposI[]
}

export interface latestReposI{
    id:number;
    name:string;
    rep_url:string
}