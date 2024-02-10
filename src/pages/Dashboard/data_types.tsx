export interface DashboardDataModel {
    message: string;
    results: Results;
}

export interface Results {
    summary:            Summary;
    top_sfi_incidents:  TopSfiIncident[];
    top_status:         TopStatus[];
    top_categories:     TopCategory[];
    top_sub_categories: TopSubCategory[];
    top_months:         TopMonth[];
    top_years:          TopYear[];
    month_incidents:    MonthIncident[];
    latest_incidents:   LatestIncident[];
}

export interface LatestIncident {
    id:                   string;
    category_name:        string;
    sfi:                  Sfi;
    classification:       string;
    category:             string;
    sub_category:         string;
    currency:             string;
    suspected_amount:     string;
    actual_amount:        string;
    actual_date:          string;
    discovered_date:      string;
    police_reference_no:  string;
    description:          string;
    actions_taken:        string;
    lessons_taken:        string;
    status:               string;
    is_active:            boolean;
    updated_at:           string;
    created_at:           string;
    category_details:     number;
    sub_category_details: number;
}


export interface Sfi {
    id:            string;
    unique_number: string;
    is_active:     boolean;
    updated_at:    string;
    created_at:    string;
}

export interface MonthIncident {
    index: number;
    month: string;
    count: number;
}

export interface Summary {
    incidents: number;
    sfis:      number;
    transfers: number;
    suspects:  number;
}

export interface TopCategory {
    category: string;
    count:    number;
}

export interface TopMonth {
    month: string;
    count: number;
}

export interface TopSfiIncident {
    sfi:           string;
    num_incidents: number;
}

export interface TopStatus {
    status: string;
    count:  number;
}

export interface TopSubCategory {
    sub_category: string;
    count:        number;
}

export interface TopYear {
    year:  number;
    count: number;
}
