import { MonthStatsModel } from "./data_types1";

export interface MultipleMonthResultsModel extends MonthStatsModel{
    results : ResultsModel,
}

export interface ResultsModel{
    status_incidents:         StatusIncident[];
    classification_incidents: ClassificationIncident[];
    category_incidents:       CategoryIncident[];
    sub_category_incidents:   SubCategoryIncident[];
    sfi_incidents:            SfiIncident[];
    month_incidents:          MonthIncident[];
    actual_amt_month:         ActualAmtMonth[];
    num_suspects_month:       NumSuspectsMonth[];
}

export interface ActualAmtMonth {
    month:                string;
    incident_count:       number;
    sum_actual_amount:    number;
    avg_actual_amount:    number;
    min_actual_amount:    number;
    max_actual_amount:    number;
    cumsum_actual_amount: number;
}

export interface CategoryIncident {
    category: string;
    count:    number;
}

export interface ClassificationIncident {
    index:          number;
    classification: string;
    count:          number;
}

export interface MonthIncident {
    index: number;
    month: string;
    count: number;
}

export interface NumSuspectsMonth {
    month:               string;
    incident_count:      number;
    sum_num_individuals: number;
}

export interface SfiIncident {
    index: number;
    sfi:   string;
    count: number;
}

export interface StatusIncident {
    status: string;
    count:  number;
}

export interface SubCategoryIncident {
    index:        number;
    sub_category: string;
    count:        number;
}
