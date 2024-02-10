export interface ChartSeries {
  name: string;
  data: number[];
}

export interface MonthStatsModel {
    message: string;
    type:    string;
}

export interface SingleMonthResultsModel extends MonthStatsModel{
    results : ResultsModel,
}

export interface ResultsModel {
    status_incidents:            StatusIncident[];
    classification_incidents:    ClassificationIncident[];
    category_incidents:          CategoryIncident[];
    sub_category_incidents:      SubCategoryIncident[];
    sfi_incidents:               SfiIncident[];
    num_suspects_status:         NumSuspectsStatus[];
    num_suspects_classification: NumSuspectsClassification[];
    num_suspects_category:       NumSuspectsCategory[];
    num_suspects_sub_category:   NumSuspectsSubCategory[];
    num_suspects_sfi:            NumSuspectsSfi[];
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

export interface NumSuspectsCategory {
    category:            string;
    sum_num_individuals: number;
}

export interface NumSuspectsClassification {
    classification:      string;
    sum_num_individuals: number;
}

export interface NumSuspectsSfi {
    sfi:                 string;
    sum_num_individuals: number;
}

export interface NumSuspectsStatus {
    status:              string;
    sum_num_individuals: number;
}

export interface NumSuspectsSubCategory {
    sub_category:        string;
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
