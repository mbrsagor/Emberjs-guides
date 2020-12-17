const data = [
  {
    "code": "FAM",
    "name": "FAM - Financial Accounting Management",
    "moduleGroups": [
      {
        "name": "Customization",
        "modules": []
      },
      {
        "name": "Financial Accounting Management",
        "modules": [
          {
            "code": "GL",
            "name": "General Ledger",
            "submodules": [],
            "features": [
              {
                "name": "a. Chart of Accounts"
              },
              {
                "name": "b. Vouchers (Journal Voucher)"
              },
              {
                "name": "c. Multi Year Ledger"
              },
              {
                "name": "c. Financial Reports"
              }
            ]
          },
          {
            "code": "AP",
            "name": "Accounts Payable",
            "submodules": [],
            "features": [
              {
                "name": "a. Vendor Master"
              },
              {
                "name": "b. Vendor Payment Voucher"
              },
              {
                "name": "b. PO based Payment\n Payable Aging"
              }
            ]
          },
          {
            "code": "AR",
            "name": "Accounts Receivable",
            "submodules": [],
            "features": [
              {
                "name": "a. Customer Master"
              },
              {
                "name": "b. Receipts"
              },
              {
                "name": "b. Invoice based Receivable Tracking\n Invoicewise Receipts\n Receivable Aging"
              }
            ]
          },
          {
            "code": "CB",
            "name": "Cashbook & Bankbook",
            "submodules": [],
            "features": [
              {
                "name": "d. Bank Master"
              },
              {
                "name": "a. Cashbook and Bankbook"
              },
              {
                "name": "a. Bank Account Reconciliation"
              },
              {
                "name": "a. Intelligent Bank Account Reconciliation with Statement Upload"
              },
              {
                "name": "c. ERP-to-Bank Interfaces"
              },
              {
                "name": "c. Mobile Banking Integration (bkash)"
              }
            ]
          },
          {
            "code": "CM",
            "name": "Cheque Management",
            "submodules": [],
            "features": [
              {
                "name": "Chequebook Management"
              },
              {
                "name": "Received Cheque Management"
              },
              {
                "name": "Direct Cheque Printing"
              }
            ]
          },
          {
            "code": "ET",
            "name": "Expense Tracking",
            "submodules": [],
            "features": [
              {
                "name": "a. Basic Expense Management"
              },
              {
                "name": "a. Recurring Expense Management"
              },
              {
                "name": "b. Employee Advance Management for Expense"
              }
            ]
          },
          {
            "code": "PM",
            "name": "Party Management",
            "submodules": [],
            "features": [
              {
                "name": "CnF Agent"
              },
              {
                "name": "Manufacturer"
              },
              {
                "name": "Employee (without HCM/Payroll Module)"
              }
            ]
          },
          {
            "code": "MCL",
            "name": "Multi Currency Ledger",
            "submodules": [],
            "features": [
              {
                "name": "Multi-Currency in Ledger"
              }
            ]
          },
          {
            "code": "MBL",
            "name": "Multi-Branch Ledger",
            "submodules": [],
            "features": [
              {
                "name": "Multi-Branch Support in Ledger and Voucher"
              },
              {
                "name": "MultiBranch Seggregated Chart of Accounts and Financial Statements"
              },
              {
                "name": "Branchwise Ledger Access Control"
              }
            ]
          },
          {
            "code": "SLO",
            "name": "Special Ledger Operations",
            "submodules": [],
            "features": [
              {
                "name": "2-Way Voucher Approval"
              }
            ]
          }
        ]
      },
      {
        "name": "Cost Accounting",
        "modules": [
          {
            "code": "CC",
            "name": "Cost Centers",
            "submodules": [],
            "features": [
              {
                "name": "a. Single Dimension Cost Center"
              },
              {
                "name": "b. Multi-Dimension Cost Center"
              }
            ]
          },
          {
            "code": "TM",
            "name": "Tresury Management",
            "submodules": [],
            "features": [
              {
                "name": "Cash Flow Forecasting"
              },
              {
                "name": "Liquidity Risk Management"
              },
              {
                "name": "Availability of Funds"
              },
              {
                "name": "Deployment of Funds"
              },
              {
                "name": "Optimum utilization of resources"
              },
              {
                "name": "Risk Management"
              }
            ]
          },
          {
            "code": "BP",
            "name": "Budgeting and Planning",
            "submodules": [],
            "features": [
              {
                "name": "Financial Account based Budget"
              },
              {
                "name": "Departmentwise Expense Budget"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "code": "SDM",
    "name": "Sales & Distribution Management",
    "moduleGroups": [
      {
        "name": "Sales Management",
        "modules": [
          {
            "code": "SI",
            "name": "Sales Invoice",
            "submodules": [
              {
                "name": "General",
                "features": [
                  {
                    "name": "Product or Service Sales"
                  },
                  {
                    "name": "Product wise Discount"
                  },
                  {
                    "name": "Account configuration in SI"
                  },
                  {
                    "name": "Barcode Integration"
                  },
                  {
                    "name": "Carton (full/partial) Quantity"
                  },
                  {
                    "name": "Product Image Integration"
                  }
                ]
              },
              {
                "name": "Payment",
                "features": [
                  {
                    "name": "Down Payment, Auto Full Payment"
                  },
                  {
                    "name": "Multiple and Mixed Payment (Pay by Cash, Credit or Bkash)"
                  }
                ]
              },
              {
                "name": "Internal Integrations",
                "features": [
                  {
                    "name": "Create SI from SO"
                  },
                  {
                    "name": "Create SI from Delivery"
                  }
                ]
              },
              {
                "name": "Extension",
                "features": [
                  {
                    "name": "Terms and Condition Management"
                  },
                  {
                    "name": "2-3-4-way matching"
                  }
                ]
              },
              {
                "name": "Advanced Features",
                "features": [
                  {
                    "name": "Multiple Format Sales Invoice"
                  },
                  {
                    "name": "Product Revenue Seggeration"
                  }
                ]
              }
            ],
            "features": []
          },
          {
            "code": "SIHV",
            "name": "High Volume Sales Invoice",
            "submodules": [],
            "features": [
              {
                "name": "Manage 1K invoice/day"
              },
              {
                "name": "Manage 10K invoice/day"
              },
              {
                "name": "Manage 100K invoice/day"
              }
            ]
          },
          {
            "code": "SVAT",
            "name": "Sales VAT",
            "submodules": [],
            "features": [
              {
                "name": "VAT on Sales Invoice"
              },
              {
                "name": "Daily and Monthly VAT Summary"
              },
              {
                "name": "Sales VAT Accounting Integration"
              },
              {
                "name": "Musok 6.3"
              },
              {
                "name": "PrismVAT Integration"
              }
            ]
          },
          {
            "code": "SWO",
            "name": "Order Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "SC",
            "name": "Sales Cancellation",
            "submodules": [],
            "features": [
              {
                "name": "Sales Cancellation (with Order)"
              },
              {
                "name": "Product Variant Integration"
              },
              {
                "name": "Cancellation without Order"
              }
            ]
          },
          {
            "code": "SDC",
            "name": "Sale Delivery Challan",
            "submodules": [],
            "features": [
              {
                "name": "Sales Delivery Challan Management"
              },
              {
                "name": "2-way matching"
              },
              {
                "name": "Delivery Return"
              },
              {
                "name": "Challan Without Invoice (Delivery Order)"
              },
              {
                "name": "Instant Delivery on Invoice"
              },
              {
                "name": "Gatepass"
              },
              {
                "name": "Delivery Order"
              }
            ]
          },
          {
            "code": "PP",
            "name": "Product Pricing",
            "submodules": [],
            "features": [
              {
                "name": "Time Based Product Price"
              },
              {
                "name": "Customer Category wise Product Price"
              },
              {
                "name": "Variant wise Price (1 variant)"
              },
              {
                "name": "Different Price for Branch"
              },
              {
                "name": "Vendor / Barcode based Pricing"
              },
              {
                "name": "Product Price Range Limit"
              }
            ]
          },
          {
            "code": "PPD",
            "name": "Product Promotion & Discount",
            "submodules": [],
            "features": [
              {
                "name": "General Discount"
              },
              {
                "name": "Trade Discount"
              },
              {
                "name": "Bulk Update General and Trade Discount"
              },
              {
                "name": "Coupon Discount"
              },
              {
                "name": "Promotional Gift(Gift Voucher)"
              },
              {
                "name": "Free Product"
              },
              {
                "name": "Bulk Quantity Promotions"
              },
              {
                "name": "Membership Card Discounts"
              }
            ]
          },
          {
            "code": "CC",
            "name": "Credit Control",
            "submodules": [],
            "features": [
              {
                "name": "Customer Credit Limit"
              },
              {
                "name": "Block Credit Limit on Credit Receipt Days"
              },
              {
                "name": "Batch Credit Limit Update Based on Sales Rate"
              },
              {
                "name": "File Upload for Credit Limit"
              }
            ]
          },
          {
            "code": "IST",
            "name": "InStore Processing",
            "submodules": [],
            "features": [
              {
                "name": "Auto Calculation of Product values"
              }
            ]
          },
          {
            "code": "SSRL",
            "name": "Sales Product Serial",
            "submodules": [],
            "features": [
              {
                "name": "Serial on Sales Invoice"
              },
              {
                "name": "Stock Validation for serial for Delivery Challan"
              },
              {
                "name": "Range Serial on Sales Deliery Challan"
              },
              {
                "name": "Delivery Challan Serial on Packing List"
              },
              {
                "name": "Delivery Challan Serial Export"
              },
              {
                "name": "Multiple Serial for single Product"
              }
            ]
          },
          {
            "code": "DPL",
            "name": "Delivery Packing List",
            "submodules": [],
            "features": [
              {
                "name": "Carton Capacity Management"
              },
              {
                "name": "Generate Carton Number for Delivery Challan"
              },
              {
                "name": "Packing List Printing"
              },
              {
                "name": "Integration with Serial Management"
              }
            ]
          },
          {
            "code": "PV",
            "name": "Product Variant Integration",
            "submodules": [],
            "features": [
              {
                "name": "Multilevel variant support on Product Configuration"
              },
              {
                "name": "Sales Invoice"
              },
              {
                "name": "Sales Cancellation"
              },
              {
                "name": "Product Pricing"
              },
              {
                "name": "Promotion and Discount"
              },
              {
                "name": "Inventory"
              },
              {
                "name": "Purchase Order"
              },
              {
                "name": "Purchase Invoice"
              },
              {
                "name": "Purchase Cancellation"
              }
            ]
          },
          {
            "code": "SHP",
            "name": "Shipment",
            "submodules": [],
            "features": [
              {
                "name": "Schedule Sales Delivery Challan on Planned dates"
              }
            ]
          },
          {
            "code": "CCM",
            "name": "Customer Category Management",
            "submodules": [],
            "features": [
              {
                "name": "Customer Category Management"
              }
            ]
          }
        ]
      },
      {
        "name": "LC Management (Export)",
        "modules": [
          {
            "code": "LCE",
            "name": "LC Management",
            "submodules": [],
            "features": [
              {
                "name": "Commercial Invoice"
              },
              {
                "name": "Proforma Invoice"
              },
              {
                "name": "Work Order"
              },
              {
                "name": "Export LC"
              },
              {
                "name": "Sales Contract"
              }
            ]
          },
          {
            "code": "LCBL",
            "name": "Business Loan Integration with LC Management",
            "submodules": [],
            "features": []
          }
        ]
      },
      {
        "name": "Distribution Management",
        "modules": [
          {
            "code": "TM",
            "name": "Territory Management",
            "submodules": [],
            "features": [
              {
                "name": "Territory Management"
              },
              {
                "name": "Territory wise Sales & Collection Report"
              },
              {
                "name": "Supervisor/Manager Management"
              }
            ]
          },
          {
            "code": "DS",
            "name": "Secondary Sales",
            "submodules": [],
            "features": [
              {
                "name": "Secondary Invoice"
              },
              {
                "name": "Secondary Customer Management"
              }
            ]
          },
          {
            "code": "DI",
            "name": "Secondary Inventory Management",
            "submodules": [],
            "features": [
              {
                "name": "Secondary Inventory"
              },
              {
                "name": "Integration with Secondary Sales"
              },
              {
                "name": "Secondary Delivery Challan"
              }
            ]
          }
        ]
      },
      {
        "name": "Sales Force Automation",
        "modules": [
          {
            "code": "SP",
            "name": "Sales Planning",
            "submodules": [],
            "features": [
              {
                "name": "Demand Forcasting"
              },
              {
                "name": "Territorywise Demand Forcasting"
              },
              {
                "name": "Individual Target and Achievement"
              },
              {
                "name": "Territorywise Target and Achievement"
              }
            ]
          },
          {
            "code": "SC",
            "name": "Sales Commission",
            "submodules": [],
            "features": [
              {
                "name": "Sales Incentive and Commission Management"
              },
              {
                "name": "Distributor Commission Management"
              },
              {
                "name": "Commission Provisioning on SI"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "code": "CRM",
    "name": "Customer Relationship Management",
    "moduleGroups": [
      {
        "name": "Customization",
        "modules": []
      },
      {
        "name": "Service Billing",
        "modules": [
          {
            "code": "SBI",
            "name": "Service Billing Invoice",
            "submodules": [],
            "features": [
              {
                "name": "Service Invoice"
              },
              {
                "name": "Service Management"
              },
              {
                "name": "Service Dashboard"
              },
              {
                "name": "Service Multi-unit"
              }
            ]
          },
          {
            "code": "SBAB",
            "name": "Service Bill Generation",
            "submodules": [],
            "features": [
              {
                "name": "Bill Generation"
              },
              {
                "name": "Bill Notice via Email / SMS"
              },
              {
                "name": "Auto Invoice Email to Customer"
              },
              {
                "name": "Partial Billing for Service Upgrade/Downgrade"
              }
            ]
          },
          {
            "code": "SBSM",
            "name": "Subscriber Management",
            "submodules": [],
            "features": [
              {
                "name": "Subscriber Management"
              },
              {
                "name": "Packages & Contract Management"
              },
              {
                "name": "Subscriber Contract Management"
              },
              {
                "name": "Service Upgrade/Downgrade"
              }
            ]
          }
        ]
      },
      {
        "name": "Sales CRM",
        "modules": [
          {
            "code": "CM",
            "name": "Campaign Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "LM",
            "name": "Lead Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "ACT",
            "name": "Activity Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "QTM",
            "name": "Quotation Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "SVY",
            "name": "Servey Management",
            "submodules": [],
            "features": []
          },
          {
            "code": "BM",
            "name": "Booking Management",
            "submodules": [],
            "features": [
              {
                "name": "Book Product on Inventory"
              },
              {
                "name": "Booking Production Capacity"
              }
            ]
          }
        ]
      },
      {
        "name": "Product Support",
        "modules": [
          {
            "code": "STS",
            "name": "Support Ticketing System",
            "submodules": [],
            "features": []
          },
          {
            "code": "RMA",
            "name": "Return Merchandise Authorization",
            "submodules": [],
            "features": [
              {
                "name": "RMA"
              },
              {
                "name": "Non Serial RMA"
              },
              {
                "name": "Serial Product RMA"
              },
              {
                "name": "Warranty Claim / Repair Servicing"
              },
              {
                "name": "Product Performance Analysis"
              },
              {
                "name": "RMA Invoice"
              },
              {
                "name": "Replacement Claim and Charge Provision"
              },
              {
                "name": "Repair Servicing Spare Parts Management / Warranty Spare Consumption"
              },
              {
                "name": "Third Party Serial Servicing Provision"
              },
              {
                "name": "SMS / Email Integration on State Change"
              }
            ]
          },
          {
            "code": "LP",
            "name": "Lease Product",
            "submodules": [],
            "features": [
              {
                "name": "Lease Product to Customer"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "code": "PMM",
    "name": "Materialand Procurement Management",
    "moduleGroups": [
      {
        "name": "Customization",
        "modules": []
      },
      {
        "name": "Sales Management",
        "modules": [
          {
            "code": "PI",
            "name": "Purchase Invoice",
            "submodules": [],
            "features": [
              {
                "name": "Product or Service Purchase"
              },
              {
                "name": "Account configuration in PI"
              },
              {
                "name": "2-3-4-way matching"
              },
              {
                "name": "Create PI from PO"
              },
              {
                "name": "Create PI from Delivery"
              }
            ]
          },
          {
            "code": "PVAT",
            "name": "Purchase VAT",
            "submodules": [],
            "features": [
              {
                "name": "VAT on Purchase Invoice"
              },
              {
                "name": "Daily and Monthly VAT Summary"
              },
              {
                "name": "Purchase VAT Accounting Integration"
              }
            ]
          },
          {
            "code": "PWO",
            "name": "Purchase Order Management",
            "submodules": [],
            "features": [
              {
                "name": "Managet Purchase Order"
              },
              {
                "name": "Create PO from Quotation"
              }
            ]
          },
          {
            "code": "PC",
            "name": "Purchase Cancellation",
            "submodules": [],
            "features": [
              {
                "name": "Purchase Cancellation"
              }
            ]
          },
          {
            "code": "GRN",
            "name": "Goods Receive Note",
            "submodules": [],
            "features": [
              {
                "name": "Goods Receive Note Management"
              },
              {
                "name": "2-way matching"
              },
              {
                "name": "Purchase Return"
              },
              {
                "name": "Delivery Challan Without PI"
              },
              {
                "name": "Create PI from GRN"
              },
              {
                "name": "Auto create GRN on PI"
              }
            ]
          },
          {
            "code": "PSRL",
            "name": "Purchase Product Serial",
            "submodules": [],
            "features": []
          },
          {
            "code": "PWTY",
            "name": "Purchase Warranty Management",
            "submodules": [],
            "features": []
          }
        ]
      },
      {
        "name": "Inventory and Warehouse Management",
        "modules": [
          {
            "code": "IC",
            "name": "Inventory Control",
            "submodules": [],
            "features": [
              {
                "name": "Material Management"
              },
              {
                "name": "Stock In, Stock Out"
              },
              {
                "name": "Reorder Product"
              },
              {
                "name": "Stock Transfer"
              },
              {
                "name": "Stock Disposal"
              },
              {
                "name": "Branch Stock Transfer"
              },
              {
                "name": "Inventory Recalculation"
              },
              {
                "name": "Inventory Reconciliation"
              }
            ]
          },
          {
            "code": "ICLM",
            "name": "Lot Management",
            "submodules": [],
            "features": [
              {
                "name": "Lot Management"
              }
            ]
          },
          {
            "code": "ICSRL",
            "name": "Serial Management",
            "submodules": [],
            "features": [
              {
                "name": "Serial Management"
              },
              {
                "name": "Secondary Serial Management"
              },
              {
                "name": "Serial in Stock Check"
              },
              {
                "name": "Optimized Serial Storage (for 1000000+ serials)"
              }
            ]
          },
          {
            "code": "ICPB",
            "name": "Inventory Product Booking",
            "submodules": [],
            "features": [
              {
                "name": "Book Inventory Product with manual number"
              },
              {
                "name": "Book Inventory Product for Order"
              },
              {
                "name": "Book Inventory Product for Person / Future Order"
              }
            ]
          },
          {
            "code": "WMS",
            "name": "Warehouse Management System",
            "submodules": [],
            "features": [
              {
                "name": "Warehouse Management System"
              }
            ]
          }
        ]
      },
      {
        "name": "Supply Chain Management",
        "modules": [
          {
            "code": "PRRQ",
            "name": "Product Requisition",
            "submodules": [],
            "features": []
          },
          {
            "code": "PREQ",
            "name": "Purchase Request",
            "submodules": [],
            "features": []
          },
          {
            "code": "QTC",
            "name": "Quotation Comparison",
            "submodules": [],
            "features": []
          },
          {
            "code": "SCM",
            "name": "Supply Chain Management",
            "submodules": [],
            "features": [
              {
                "name": "Purchase Cost Analysis"
              }
            ]
          },
          {
            "code": "PQC",
            "name": "Purchase Quatlity Control",
            "submodules": [],
            "features": []
          }
        ]
      },
      {
        "name": "Import Goods",
        "modules": [
          {
            "code": "LCI",
            "name": "Purchase LC (Import)",
            "submodules": [],
            "features": []
          }
        ]
      }
    ]
  },
  {
    "code": "HCM",
    "name": "Procurement and Material Management",
    "moduleGroups": [
      {
        "name": "Customization",
        "modules": []
      },
      {
        "name": "Employee Management",
        "modules": [
          {
            "code": "PIM",
            "name": "Personal Information Management",
            "submodules": [],
            "features": [
              {
                "name": "Department Master Data"
              },
              {
                "name": "Designation Master Data"
              },
              {
                "name": "Employee Profile"
              },
              {
                "name": "Activation/Deactivation"
              }
            ]
          },
          {
            "code": "PIMX",
            "name": "Extended PIM",
            "submodules": [],
            "features": [
              {
                "name": "Employee Qualifications Management"
              },
              {
                "name": "Employee Documents Management"
              },
              {
                "name": "Employee Signature Management"
              }
            ]
          },
          {
            "code": "EM",
            "name": "Employment Management",
            "submodules": [],
            "features": [
              {
                "name": "Employement Information/History"
              },
              {
                "name": "Branch Transfer Management"
              },
              {
                "name": "Department Transfer"
              }
            ]
          },
          {
            "code": "ESP",
            "name": "Employee Separation",
            "submodules": [],
            "features": [
              {
                "name": "Advanced Final Settlement"
              },
              {
                "name": "Exit Clearance"
              },
              {
                "name": "Template Management"
              },
              {
                "name": "Assigned Manager Portal"
              },
              {
                "name": "Bill Processing"
              }
            ]
          },
          {
            "code": "PRFA",
            "name": "Performance Appraisal",
            "submodules": [],
            "features": [
              {
                "name": "Upcoming Appraisals"
              },
              {
                "name": "Indivual Employee Performance Apprasials"
              },
              {
                "name": "Performance Appraisal Score"
              },
              {
                "name": "Appraisal Approval Layers"
              },
              {
                "name": "Appraisal Pending for Scoring"
              },
              {
                "name": "Performance Appraisal Evaluation"
              },
              {
                "name": "Performance Rating System"
              },
              {
                "name": "Performance Criteria (Single or Group)"
              },
              {
                "name": "Performance Appraisal Form"
              },
              {
                "name": "Performance Criteria Group Weightage"
              }
            ]
          },
          {
            "code": "IDC",
            "name": "ID Card Management",
            "submodules": [],
            "features": [
              {
                "name": "Employee ID Card Generation"
              },
              {
                "name": "Visitor ID Card Management"
              }
            ]
          }
        ]
      },
      {
        "name": "Manpower & Cost Management",
        "modules": [
          {
            "code": "MR",
            "name": "Manpower Requisition",
            "submodules": [],
            "features": [
              {
                "name": "Job Requisition from Departmental Manager"
              },
              {
                "name": "Approval Notification Email"
              },
              {
                "name": "Assigned Approver"
              },
              {
                "name": "Requisition for Single & Multiple Post"
              },
              {
                "name": "Priority & Deadline setup"
              }
            ]
          },
          {
            "code": "MAM",
            "name": "Manpower Allocation",
            "submodules": [],
            "features": []
          },
          {
            "code": "ES",
            "name": "Employee Specializations",
            "submodules": [],
            "features": [
              {
                "name": "Employee Specialization"
              }
            ]
          },
          {
            "code": "EXP",
            "name": "Expenditure Reporting",
            "submodules": [],
            "features": [
              {
                "name": "Departmentwise Expenditure"
              }
            ]
          },
          {
            "code": "HRCC",
            "name": "Cost Center",
            "submodules": [],
            "features": [
              {
                "name": "Cost Segment Assignment"
              },
              {
                "name": "Cost Center Dashboard"
              },
              {
                "name": "Cost Center Wise Expense Summary"
              },
              {
                "name": "HR Budgets"
              },
              {
                "name": "HR Cost Center Budgets"
              },
              {
                "name": "Yearly Budget Expense Comparison"
              }
            ]
          }
        ]
      },
      {
        "name": "Recruitment",
        "modules": [
          {
            "code": "REC",
            "name": "Recruitment",
            "submodules": [],
            "features": [
              {
                "name": "Job Template/JD/Job Posting"
              },
              {
                "name": "Candidate Management"
              },
              {
                "name": "Hiring"
              }
            ]
          },
          {
            "code": "CVB",
            "name": "CV Bank*",
            "submodules": [],
            "features": []
          },
          {
            "code": "JPA",
            "name": "Recuitment Job Posting API",
            "submodules": [],
            "features": []
          },
          {
            "code": "CE",
            "name": "Candidate Evaluation",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Written/Viva or other exam Marking Provision"
              },
              {
                "name": "Educational marking provision (SSC, HSC, B.Sc, M.Sc, Degree)"
              }
            ]
          },
          {
            "code": "RECP",
            "name": "Candidate Portal",
            "submodules": [],
            "features": [
              {
                "name": "Online Job Application"
              },
              {
                "name": "Candidate Registration*"
              }
            ]
          }
        ]
      },
      {
        "name": "Training Management",
        "modules": [
          {
            "code": "TRS",
            "name": "Training Schedule Management",
            "submodules": [],
            "features": [
              {
                "name": "Training Schedule"
              },
              {
                "name": "Training Status"
              },
              {
                "name": "Training Venue"
              },
              {
                "name": "Training Organization"
              },
              {
                "name": "Timeline & Duration Maintenance"
              },
              {
                "name": "Training Calendar"
              }
            ]
          },
          {
            "code": "TRE",
            "name": "Trainee Management",
            "submodules": [],
            "features": [
              {
                "name": "Assign Employee to Trainee"
              },
              {
                "name": "Training Attendance"
              },
              {
                "name": "Training Evaluations"
              }
            ]
          },
          {
            "code": "TRC",
            "name": "Training Cost Management",
            "submodules": [],
            "features": [
              {
                "name": "Training Budget"
              },
              {
                "name": "Budget Expenditure Summary"
              },
              {
                "name": "Training Vouchers"
              },
              {
                "name": "Schedule Wise Training Vouchers"
              }
            ]
          },
          {
            "code": "TRT",
            "name": "Trainer Management",
            "submodules": [],
            "features": [
              {
                "name": "Trainer Management"
              },
              {
                "name": "Training Wise Trainers"
              }
            ]
          },
          {
            "code": "TRA",
            "name": "Training Activities",
            "submodules": [],
            "features": [
              {
                "name": "Training Materials"
              },
              {
                "name": "Training Certificate"
              }
            ]
          },
          {
            "code": "EAS",
            "name": "Employee Asset Management",
            "submodules": [],
            "features": [
              {
                "name": "Asset Add with ID"
              },
              {
                "name": "Asset Assignment"
              },
              {
                "name": "Asset Release"
              },
              {
                "name": "Integration with Asset Management Module"
              }
            ]
          }
        ]
      },
      {
        "name": "Time and Attendance",
        "modules": [
          {
            "code": "AM",
            "name": "Attendance Management",
            "submodules": [],
            "features": [
              {
                "name": "General Attendance"
              },
              {
                "name": "Absent Management"
              },
              {
                "name": "Work in Holiday"
              },
              {
                "name": "Attendance Device Integration"
              },
              {
                "name": "Attendnace Data Manual Entry"
              },
              {
                "name": "Import or Upload Attendance Data"
              },
              {
                "name": "Time Rounding & Skip Over Information"
              }
            ]
          },
          {
            "code": "EM",
            "name": "Employee Movement",
            "submodules": [],
            "features": [
              {
                "name": "Employee Movement"
              }
            ]
          },
          {
            "code": "DI",
            "name": "Device Integration",
            "submodules": [],
            "features": [
              {
                "name": "Post & Unpost Attendance Deivce Data"
              },
              {
                "name": "Real Time Device Data Syncronization"
              },
              {
                "name": "Unposted Data View"
              },
              {
                "name": "Attendance Verification Control"
              }
            ]
          },
          {
            "code": "LTM",
            "name": "Late Manageemnt",
            "submodules": [],
            "features": [
              {
                "name": "Late Employee Leave Deduction Policy"
              },
              {
                "name": "Consecutive & Non-consecutive Late Days"
              },
              {
                "name": "Deducted Leave Type Prorities"
              }
            ]
          },
          {
            "code": "OT",
            "name": "Overtime Management",
            "submodules": [],
            "features": [
              {
                "name": "Overtime Management"
              },
              {
                "name": "Extra Overtime Management"
              },
              {
                "name": "Overtime Buyer Compliance Report"
              }
            ]
          },
          {
            "code": "SM",
            "name": "Shift Management",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Shift Management"
              },
              {
                "name": "Shift Schedule Management & Status"
              },
              {
                "name": "Shift Time Slot Management"
              },
              {
                "name": "Batch shift assignment"
              }
            ]
          },
          {
            "code": "SR",
            "name": "Shift Roster",
            "submodules": [],
            "features": [
              {
                "name": "Shift Rostering Management"
              },
              {
                "name": "Employee by Shift"
              },
              {
                "name": "Off Day Shift"
              },
              {
                "name": "Roster By Shift Sequences"
              }
            ]
          },
          {
            "code": "SS",
            "name": "Shift Swap",
            "submodules": [],
            "features": [
              {
                "name": "Shift Swapping"
              },
              {
                "name": "Swap Employee"
              },
              {
                "name": "Swap Approval"
              },
              {
                "name": "Recommend Shift Swap"
              },
              {
                "name": "Mail Recommendation Shift Swap"
              },
              {
                "name": "Rollback Shift Swap"
              }
            ]
          }
        ]
      },
      {
        "name": "Leave Management System",
        "modules": [
          {
            "code": "LMS",
            "name": "Leave Management",
            "submodules": [],
            "features": [
              {
                "name": "Leave Policy"
              },
              {
                "name": "Holiday Management"
              },
              {
                "name": "Leave Carry Forward"
              },
              {
                "name": "Leave Application"
              },
              {
                "name": "Revise Leave Applications"
              },
              {
                "name": "Partial and Fractional Leave"
              },
              {
                "name": "Leave Application Approval"
              },
              {
                "name": "Dual Layer of Approval Dual"
              },
              {
                "name": "Employee Wise Policy Assignment"
              },
              {
                "name": "Holiday Calender"
              }
            ]
          },
          {
            "code": "LE",
            "name": "Leave Encashment",
            "submodules": [],
            "features": [
              {
                "name": "Leave Carry Forward Process"
              },
              {
                "name": "Encashment Payment Procedure"
              },
              {
                "name": "Encashment Paid Status"
              }
            ]
          },
          {
            "code": "ML",
            "name": "Maternity Leave",
            "submodules": [],
            "features": [
              {
                "name": "Maternity Leave Policy"
              },
              {
                "name": "Paternity Leave Policy"
              },
              {
                "name": "Billing Processing"
              },
              {
                "name": "Bill Approval"
              }
            ]
          }
        ]
      },
      {
        "name": "Payroll",
        "modules": [
          {
            "code": "EBM",
            "name": "Employee Benefits Management",
            "submodules": [],
            "features": [
              {
                "name": "Payscale and Paygrade Master Data"
              },
              {
                "name": "Employee Benefits"
              }
            ]
          },
          {
            "code": "PRSP",
            "name": "Salary Processing",
            "submodules": [],
            "features": [
              {
                "name": "Monthly Salary Processing"
              },
              {
                "name": "Weekly Salary Processing"
              },
              {
                "name": "Hour Base Pay Processing"
              },
              {
                "name": "Production Base Pay Processing"
              },
              {
                "name": "Bank Transfer"
              },
              {
                "name": "Custom Payroll Schedule"
              },
              {
                "name": "Multilingual Payslip"
              }
            ]
          },
          {
            "code": "PRAM",
            "name": "Monthly Allowance Management",
            "submodules": [],
            "features": [
              {
                "name": "Allowance Master Data Management"
              },
              {
                "name": "Schedule Allowance Entry"
              }
            ]
          },
          {
            "code": "EL",
            "name": "Loan and Advance",
            "submodules": [],
            "features": [
              {
                "name": "Loan & Advance Manager with EMI"
              },
              {
                "name": "Salary Loan Configuration"
              },
              {
                "name": "EMI Based Salary Loan"
              },
              {
                "name": "Employee Salary Advance"
              },
              {
                "name": "Loan Approval Layer"
              }
            ]
          },
          {
            "code": "PRP",
            "name": "Payment Processing",
            "submodules": [],
            "features": [
              {
                "name": "Partial / Full Payment"
              },
              {
                "name": "Bank Transfer"
              },
              {
                "name": "Payment Notification*"
              }
            ]
          },
          {
            "code": "BNS",
            "name": "Bonus Payment",
            "submodules": [],
            "features": [
              {
                "name": "Bonus and Benefits"
              },
              {
                "name": "Liability Creation & Payment"
              },
              {
                "name": "Calculation Slab"
              }
            ]
          },
          {
            "code": "EITAX",
            "name": "Employee Income Tax",
            "submodules": [],
            "features": [
              {
                "name": "Tax Rules Configuratin"
              },
              {
                "name": "Salary Tax Calculation"
              },
              {
                "name": "Tax Examption Policy"
              },
              {
                "name": "Investment Return Manager"
              },
              {
                "name": "Tax Statement"
              },
              {
                "name": "Bangladesh Employee Income Tax Compliance"
              }
            ]
          },
          {
            "code": "UP",
            "name": "Unscheduled Payments",
            "submodules": [],
            "features": [
              {
                "name": "Reimbursement"
              },
              {
                "name": "Arrear Payment"
              },
              {
                "name": "Pro-rata Basis Payment"
              },
              {
                "name": "Miscellaneous Payment"
              }
            ]
          }
        ]
      },
      {
        "name": "Fund and Gratuity",
        "modules": [
          {
            "code": "REF",
            "name": "Refund Mangement",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Refund Policy setup"
              },
              {
                "name": "Refund Interest Calculations"
              },
              {
                "name": "Refund Summary"
              }
            ]
          },
          {
            "code": "PFM",
            "name": "Provident Fund Management",
            "submodules": [],
            "features": [
              {
                "name": "Calculation & Contribution Policy"
              },
              {
                "name": "PF Refund Policy"
              },
              {
                "name": "PF Calculations Integration with Payroll Process"
              },
              {
                "name": "Final Settlement Integration"
              }
            ]
          },
          {
            "code": "PFL",
            "name": "PF Loan",
            "submodules": [],
            "features": [
              {
                "name": "Interest Based PF Loan"
              },
              {
                "name": "PF Loan Integration witn Employee Loan"
              }
            ]
          },
          {
            "code": "PFA",
            "name": "PF Accounting",
            "submodules": [],
            "features": [
              {
                "name": "PF Journals"
              },
              {
                "name": "Contribution & Expence Account Setup"
              },
              {
                "name": "Laps Fund Management"
              }
            ]
          },
          {
            "code": "GR",
            "name": "Gratuity",
            "submodules": [],
            "features": [
              {
                "name": "Gratuity Configuration"
              },
              {
                "name": "Final Settlement Integration"
              },
              {
                "name": "Departmentwise Expenditures"
              }
            ]
          }
        ]
      },
      {
        "name": "Employee Portal",
        "modules": [
          {
            "code": "EMP",
            "name": "Employee Portal",
            "submodules": [],
            "features": [
              {
                "name": "Employee Self Profile"
              },
              {
                "name": "Online Leave Application"
              },
              {
                "name": "Leave Approval of Subordinates"
              },
              {
                "name": "My Attendance Information"
              },
              {
                "name": "My PaySlip"
              }
            ]
          }
        ]
      },
      {
        "name": "Android App",
        "modules": [
          {
            "code": "AA",
            "name": "Android App",
            "submodules": [],
            "features": [
              {
                "name": "Mobile Attendance"
              },
              {
                "name": "Leave Application"
              },
              {
                "name": "Location Tracking with Attendance"
              },
              {
                "name": "Payslip*"
              }
            ]
          }
        ]
      },
      {
        "name": "Data Migration",
        "modules": [
          {
            "code": "DM",
            "name": "Data Migration Services",
            "submodules": [],
            "features": [
              {
                "name": "Training Information Upload"
              },
              {
                "name": "Attendance Information Upload"
              },
              {
                "name": "Leave Information Upload"
              }
            ]
          }
        ]
      },
      {
        "name": "HR Administration",
        "modules": [
          {
            "code": "AT",
            "name": "Audit Trail",
            "submodules": [],
            "features": [
              {
                "name": "Change History of Leave"
              },
              {
                "name": "Change History of Payroll"
              },
              {
                "name": "Change History of Salary"
              },
              {
                "name": "Change History of Promotion and Transfer"
              },
              {
                "name": "Approval History of Leave"
              },
              {
                "name": "Approval Histroy of Final Settlement"
              }
            ]
          }
        ]
      }
    ]
  }
];

export default data;