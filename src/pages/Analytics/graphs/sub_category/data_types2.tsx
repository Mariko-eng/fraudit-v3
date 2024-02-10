import { SubCategoryStatsModel } from "./data_types1";

export interface MultipleSubCategoryResultsModel extends SubCategoryStatsModel{
    results : ResultsModel,
}

export interface ResultsModel{
    actual_amt_sub_category:         ActualAmtSubCategory[];
    num_suspects_sub_category:       NumSuspectsSubCategory[];
}

export interface ActualAmtSubCategory {
    sub_category:         string;
    incident_count:       number;
    sum_actual_amount:    number;
    avg_actual_amount:    number;
    min_actual_amount:    number;
    max_actual_amount:    number;
    cumsum_actual_amount: number;
}

export interface NumSuspectsSubCategory {
    sub_category:        string;
    sum_num_individuals: number;
}