import { SfiStatsModel } from "./data_types1";

export interface MultipleSfiResultsModel extends SfiStatsModel{
    results : ResultsModel,
}

export interface ResultsModel{
    actual_amt_sfi:         ActualAmtSfi[];
    num_suspects_sfi:       NumSuspectsSfi[];
}

export interface ActualAmtSfi {
    sfi:             string;
    incident_count:       number;
    sum_actual_amount:    number;
    avg_actual_amount:    number;
    min_actual_amount:    number;
    max_actual_amount:    number;
    cumsum_actual_amount: number;
}

export interface NumSuspectsSfi {
    sfi:            string;
    sum_num_individuals: number;
}