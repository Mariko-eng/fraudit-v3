export interface SubCategory {
  name: string;
  desc: string;
}

export interface Category {
  name: string;
  desc: string;
  sub_categories: SubCategory[];
}

export const category_list: Category[] = [
  {
    name: "Electronic_Fraud",
    desc: "Electronic Fraud",
    sub_categories: [
      { name: "Mobile_Banking_Fraud", desc: "Mobile Banking Fraud" },
      { name: "Online_Banking_Fraud", desc: "Online Banking Fraud" },
      { name: "Agent_Banking_Fraud", desc: "Agent Banking Fraud" },
      { name: "P2P_Payment_Fraud", desc: "P2P Payment Fraud" },
      { name: "Wire_transfer_Fraud", desc: "Wire Transfer Fraud" },
      { name: "Tech_Support_Scams_Fraud", desc: "Tech Support Scams" },
    ],
  },
  {
    name: "Cash_Fraud",
    desc: "Cash Fraud",
    sub_categories: [
      { name: "Cash_Theft_Fraud", desc: "Cash Theft Fraud" },
      { name: "Cash_Suppression_Fraud", desc: "Cash Suppression Fraud" },
      { name: "Cash_Skimming_Fraud", desc: "Cash Skimming Fraud" },
      { name: "Cash_Lapping_Fraud", desc: "Cash Lapping Fraud" },
      { name: "Cash_Shortages_Fraud", desc: "Cash Shortages Fraud" },
      {
        name: "Cash_Misappropriation_Fraud",
        desc: "Cash Misappropriation Fraud",
      },
    ],
  },

  {
    name: "Card_Fraud",
    desc: "Card Fraud",
    sub_categories: [
      { name: "Credit_Card_Fraud", desc: "Credit Card Fraud" },
      { name: "Debit_Card_Fraud", desc: "Debit Card Fraud" },
      { name: "Prepaid_Card_Fraud", desc: "Prepaid Card Fraud" },
      { name: "Virtual_Card_Fraud", desc: "Virtual Card Fraud" },
    ],
  },

  {
    name: "Cheque_Fraud",
    desc: "Cheque Fraud",
    sub_categories: [
      { name: "Paper_Cheque_Fraud", desc: "Paper Cheque Fraud" },
      { name: "Digital_Cheque_Fraud", desc: "Digital Cheque Fraud" },
      { name: "Cheque_Overpayment_Fraud", desc: "Cheque Overpayment Fraud" },
    ],
  },

  {
    name: "Identity_Compromise_Fraud",
    desc: "Identity Compromise Fraud",
    sub_categories: [
      { name: "Application_Fraud", desc: "Application Fraud" },
      { name: "Identity_Theft_Fraud", desc: "Identity Theft Fraud" },
      { name: "Forgery_Fraud", desc: "Forgery Fraud" },
      { name: "Impersonation_Fraud", desc: "Impersonation Fraud" },
      { name: "New_Account_Fraud", desc: "New Account Fraud" },
      { name: "Account_Takeover_Fraud", desc: "Account Takeover Fraud" },
      { name: "Credential_Stuffing_Fraud", desc: "Credential Stuffing Fraud" },
      { name: "Call_Center_Fraud", desc: "Call Center Fraud" },
      { name: "Social_Engineering_Fraud", desc: "Social Engineering Fraud" },
    ],
  },

  {
    name: "Counterfeit_Fraud",
    desc: "Counterfeit Fraud",
    sub_categories: [
      {
        name: "Counterfeit_Currency_Fraud",
        desc: "Counterfeit Currency Fraud",
      },
      { name: "Counterfeit_Goods_Fraud", desc: "Counterfeit Goods Fraud" },
    ],
  },

  {
    name: "Loan_Fraud",
    desc: "Loan Fraud",
    sub_categories: [
      { name: "Income_Fraud", desc: "Income Fraud" },
      { name: "Asset_Fraud", desc: "Asset Fraud" },
      { name: "Employment_Fraud", desc: "Employment Fraud" },
      { name: "Property_Fraud", desc: "Property Fraud" },
    ],
  },

  {
    name: "Money_Laundering_Fraud",
    desc: "Money Laundering Fraud",
    sub_categories: [
      { name: "Placement_Fraud", desc: "Placement Fraud" },
      { name: "Layering_Fraud", desc: "Layering Fraud" },
      { name: "Integration_Fraud", desc: "Integration Fraud" },
      { name: "Extraction_Fraud", desc: "Extraction Fraud" },
    ],
  },

  {
    name: "Cyber_Fraud",
    desc: "Cyber Fraud",
    sub_categories: [
      { name: "Phishing_Attacks_Fraud", desc: "Phishing Attacks Fraud" },
      { name: "Spam_Emails_Fraud", desc: "Spam Emails Fraud" },
      { name: "Click_Fraud", desc: "Click Fraud" },
      { name: "Malware_Fraud", desc: "Malware Viruses Fraud" },
      { name: "Internet_Dialer_Fraud", desc: "Internet Dialer Fraud" },
      { name: "Domain_Name_Fraud", desc: "Domain Name Fraud" },
      { name: "Remote_Access_Tools_Fraud", desc: "Remote Access Tools Fraud" },
    ],
  },

  {
    name: "Customer_Fraud",
    desc: "Customer Fraud",
    sub_categories: [
      { name: "Auction_Fraud", desc: "Auction Fraud" },
      { name: "Online_Shopping_Fraud", desc: "Online_Shopping Fraud" },
      { name: "Distribution_Fraud", desc: "Distribution Fraud" },
      { name: "Land_Banking_Fraud", desc: "Land Banking Fraud" },
      { name: "Counterfiet_Goods_Fraud", desc: "Counterfeit Goods Fraud" },
    ],
  },

  {
    name: "Financial_Investment_Fraud",
    desc: "Financial Investment Fraud",
    sub_categories: [
      { name: "Trade_Finance_Fraud", desc: "Trade Finance Fraud" },
      { name: "Share_Sale_Fraud", desc: "Share Sale Fraud" },
      { name: "Property_Fraud", desc: "Property Fraud" },
      { name: "Ponzi_Sheme_Fraud", desc: "Ponzi Sheme Fraud" },
      { name: "Cryptocurrency_Fraud", desc: "Cryptocurrency Fraud" },
      { name: "Hedge_Fund_Fraud", desc: "Hedge Fund Fraud" },
      { name: "Marketing_Fraud", desc: "Marketing Fraud" },
      { name: "Bond_Fraud", desc: "Bond Fraud" },
      { name: "Insurance_Fraud", desc: "Insurance Fraud" },
    ],
  },

  {
    name: "Government_Benefit_Fraud",
    desc: "Government Benefit Fraud",
    sub_categories: [
      { name: "Unemployment_Benefit_Fraud", desc: "Government Benefit Fraud" },
      { name: "Social_Security_Fraud", desc: "Social Security Fraud" },
      { name: "Welfare_Fraud", desc: "Welfare Fraud" },
    ],
  },

  {
    name: "Charity_Fraud",
    desc: "Charity Fraud",
    sub_categories: [
      { name: "Fake_Charities_Fraud", desc: "Fake Charities Fraud" },
      { name: "Misuse_Of_Funds_Fraud", desc: "Misuse Of Funds Fraud" },
      { name: "Donation_Funds_Fraud", desc: "Donation Funds Fraud" },
    ],
  },
];

export const get_sub_category_list = (category?: string | undefined) => {
  const cats = category_list.filter((item) => item.name === category);

  if (cats.length >= 1) {
    return [{ name: "", desc: "Select..." }, ...cats[0].sub_categories];
  } else {
    return [];
  }
};
