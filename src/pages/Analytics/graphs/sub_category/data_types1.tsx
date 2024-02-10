export interface ChartSeries {
  name: string;
  data: number[];
}

export interface SubCategoryStatsModel {
    message: string;
    type:    string;
}

export interface SingleSubCategoryResultsModel extends SubCategoryStatsModel{
    results : ResultsModel,
}

export interface ResultsModel {
    status_incidents:            StatusIncident[];
    classification_incidents:    ClassificationIncident[];
    sfi_incidents:               SfiIncident[];
    num_suspects_status:         NumSuspectsStatus[];
    num_suspects_classification: NumSuspectsClassification[];
    num_suspects_sfi:            NumSuspectsSfi[];
}


export interface ClassificationIncident {
    index:          number;
    classification: string;
    count:          number;
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


export interface SfiIncident {
    index: number;
    sfi:   string;
    count: number;
}

export interface StatusIncident {
    status: string;
    count:  number;
}
