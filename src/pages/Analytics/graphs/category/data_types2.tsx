import { CategoryStatsModel } from "./data_types1";

export interface MultipleCategoryResultsModel extends CategoryStatsModel{
    results : ResultsModel,
}

export interface ResultsModel{
    actual_amt_category:         ActualAmtCategory[];
    num_suspects_category:       NumSuspectsCategory[];
}

export interface ActualAmtCategory {
    category:             string;
    incident_count:       number;
    sum_actual_amount:    number;
    avg_actual_amount:    number;
    min_actual_amount:    number;
    max_actual_amount:    number;
    cumsum_actual_amount: number;
}

export interface NumSuspectsCategory {
    category:            string;
    sum_num_individuals: number;
}