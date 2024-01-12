import { Common } from "./common_type" 

export type Incident = Common & {
    category: string,
    sub_category: string,
    description: string,
}