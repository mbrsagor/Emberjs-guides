const data = [
  {
    "code": "FAM",
    "name": "Financial Management System",
    "moduleGroups": [
      {
        "multipliers": [
          {
            code: "accounts",
            name:  "params.accounts.FAM",
            label: "Number of Accounts",
            slabs: [350, 750, 1000],
            sources: ["params.accounts"]
          },
          {
            code:  "branches",
            name:  "params.branches.FAM",
            label: "Number of Branches",
            sources: ["params.accounts"],
            slabs: [2, 4, 8]
          }
        ],
        "name": "Financial Accounting Management",
        "modules": [
          {
            "code": "GL",
            "name": "General Ledger",
            "submodules": [],
            "features": [
              {
                "name": "Chart of Accounts",
                "description": "Organize your chart of accounts"
              },
              {
                "name": "Vouchers (Journal Voucher)",
                "description": "Manager your transactions"
              },
              {
                "name": "Multiyear transaction history",
                "description": "View multi year transactions at one place"
              }
            ],
            "description": "All your ledger books at your fingertips",
            "price": {
              "multiplier": "accounts",
              "slab1": 10000,
              "slab2": 30000,
              "slab3": 100000
            }
          },
          {
            "code": "FR",
            "name": "Financial Reports",
            "submodules": [],
            "features": [
              {
                "name": "Core Financial Report",
                "description": "Balance Sheet, Trial Balance, Income Statement, Cash flow Statement etc."
              },
              {
                "code": "CR",
                "name": "Comparison Reports",
                "ready": "x",
                "description": "Year by year balance sheet and income statement",
                "price": {
                  "slab1": 25000,
                  "slab2": 40000,
                  "slab3": 100000
                }
              }
            ],
            "description": "Standard compliance financial reports",
            "price": {
              "slab1": 5000,
              "slab2": 20000,
              "slab3": 50000
            }
          },
          {
            "code": "AP",
            "name": "Accounts Payable",
            "submodules": [],
            "features": [
              {
                "name": "Vendor Master",
                "description": "Manage vendor information"
              },
              {
                "name": "Payment Voucher",
                "description": "Payment Voucher"
              },
              {
                "name": "PO wise Payment with Aging Reports",
                "description": "Track Payments with Purchase Order and monitor payable aging reports",
                "price": {
                  "slab1": 10000,
                  "slab2": 30000,
                  "slab3": 50000
                }
              }
            ],
            "description": "All payments at one place",
            "price": {
              "multiplier": "accounts",
              "slab1": 10000,
              "slab2": 30000,
              "slab3": 50000
            }
          },
          {
            "code": "AR",
            "name": "Accounts Receivable",
            "submodules": [],
            "features": [
              {
                "name": "Customer Master",
                "description": "Manage customer informatin"
              },
              {
                "name": "Receipts",
                "description": "Prepare money receipts for customers"
              },
              {
                "name": "Invoice based Receivable with Aging Reports",
                "description": "Track Receipts with Invoices and get aging reports",
                "price": {
                  "slab1": 10000,
                  "slab2": 30000,
                  "slab3": 50000
                }
              }
            ],
            "description": "Receivables simplified",
            "price": {
              "multiplier": "accounts",
              "slab1": 10000,
              "slab2": 30000,
              "slab3": 50000
            }
          },
          {
            "code": "CB",
            "name": "Cashbook & Bankbook",
            "submodules": [],
            "features": [
              {
                "name": "Bank Master"
              },
              {
                "name": "Cashbook and Bankbook"
              },
              {
                "name": "Bank Account Reconciliation"
              },
              {
                "name": "Intelligent Bank Account Reconciliation with Statement Upload"
              },
              {
                "name": "ERP-to-Bank Interfaces"
              },
              {
                "name": "Mobile Banking Integration (bkash)",
                "price": {
                  "slab1": 40000
                }
              }
            ],
            "price": {
              "multiplier": "accounts",
              "slab1": 5000,
              "slab2": 10000,
              "slab3": 10000
            }
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
                "name": "Received Cheque Management",
                "price": {
                  "slab1": 20000
                }
              },
              {
                "name": "Direct Cheque Printing",
                "price": {
                  "slab1": 16000
                }
              }
            ],
            "price": {
              "multiplier": "accounts",
              "slab1": 20000,
              "slab2": 30000,
              "slab3": 40000
            }
          },
          {
            "code": "ET",
            "name": "Expense Tracking",
            "submodules": [],
            "features": [
              {
                "name": "Basic Expense Management"
              },
              {
                "name": "Recurring Expense Management",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Employee Advance Management for Expense",
                "price": {
                  "slab1": 20000
                }
              }
            ],
            "price": {
              "slab1": 5000
            }
          },
          {
            "code": "PM",
            "name": "Party Management",
            "submodules": [],
            "features": [
              {
                "name": "CnF Agent",
                "price": {
                  "slab1": 10000
                }
              },
              {
                "name": "Manufacturer",
                "price": {
                  "slab1": 10000
                }
              },
              {
                "name": "Employee (without HCM/Payroll Module)",
                "price": {
                  "slab1": 10000
                }
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
              },
              {
                "name": "Multi Currency Financial Reports"
              }
            ],
            "price": {
              "multiplier": "accounts",
              "slab1": 300000
            }
          },
          {
            "code": "SLO",
            "name": "Special Ledger Operations",
            "submodules": [],
            "features": [
              {
                "name": "2-Way Voucher Approval"
              }
            ],
            "price": {
              "slab1": 20000
            }
          },
          {
            "code": "BACL",
            "name": "Branch Account Access Control",
            "submodules": [],
            "features": [
              {
                "name": "Cashbook and Bankbook"
              },
              {
                "name": "Branchwise Ledger Access Control"
              },
              {
                "name": "Customers",
                "price": {
                  "slab1": 30000,
                  "slab2": 75000,
                  "slab3": 200000
                }
              },
              {
                "name": "Vendors",
                "price": {
                  "slab1": 30000,
                  "slab2": 75000,
                  "slab3": 200000
                }
              }
            ],
            "price": {
              "multiplier": "branch",
              "slab1": 30000,
              "slab2": 75000,
              "slab3": 200000
            }
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
              }
            ],
            "price": {
              "multiplier": "branch",
              "slab1": 30000,
              "slab2": 75000,
              "slab3": 200000
            }
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
                "name": "Single Dimension Cost Center"
              },
              {
                "name": "Multi-Dimension Cost Center",
                "price": {
                  "slab1": 200000
                }
              }
            ],
            "price": {
              "slab1": 60000
            }
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
            ],
            "price": {
              "slab1": 200000
            }
          },
          {
            "code": "BP",
            "name": "Company Budgeting and Planning",
            "submodules": [],
            "features": [
              {
                "name": "Financial Account based Budget"
              },
              {
                "name": "Departmentwise Expense Budget"
              },
              {
                "name": "Branchwise Budget"
              }
            ],
            "price": {
              "slab1": 80000
            }
          }
        ]
      }
    ]
  }
];

export default data;