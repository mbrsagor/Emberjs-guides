const data = [
  {
    "code": "FMS",
    "name": "Financial Management System",
    "moduleGroups": [
      {
        "name": "Financial Accounting",
        "code": "FA",
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
              "multiplier": "accounts",
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
                "name": "Bank Master",
                "description": "Add and Manage Banks for all relevant financial activities."
              },
              {
                "name": "Cashbook and Bankbook",
                "description": "View all Cash Transactions and  Bank-Only Transactions"
              },
              {
                "name": "Bank Account Reconciliation",
                "description": "Adjust the Balance of Bank Statements to the corrected balance."
              },
              {
                "name": "Intelligent Bank Account Reconciliation with Statement Upload",
                "description": "Accurate Bank Account Reconciliation with provision for uploading Bank Statements"
              },
              {
                "name": "ERP-to-Bank Interfaces",
                "description": "Comprehensive provision of using Bank Information in any sort of Financial or Operational Activity"
              },
              {
                "name": "Mobile Banking Integration (bkash)",
                "description": "Provision of Mobile Banking VIA bKash",
                "price": {
                  "slab1": 40000
                }
              }
            ],
            "description": "One Stop Platform to view Cashbook and Bankbook",
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
                "name": "Chequebook Management",
                "description": "Issue and Manage Cheques for all relevant Financial Operations"
              },
              {
                "name": "Received Cheque Management",
                "description": "Manage Received Cheques in details with minimal efforts",
                "price": {
                  "slab1": 20000
                }
              },
              {
                "name": "Direct Cheque Printing",
                "ready": "x",
                "price": {
                  "slab1": 16000
                }
              }
            ],
            "description": "Manage Issued and Received Cheques with intricate filtering options",
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
                "name": "Basic Expense Management",
                "description": "Track Basic Expense of Business from Expense Vouchers"
              },
              {
                "name": "Recurring Expense Management",
                "description": "Tracking your regular expenses has become easier now.",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Employee Advance Management for Expense",
                "description": "Track Employee Advance Expense from the list of Payroll",
                "price": {
                  "slab1": 20000
                }
              }
            ],
            "description": "Track your Overall Business Expenses",
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
                "description": "Add and Manage CnF Agent",
                "price": {
                  "slab1": 10000
                }
              },
              {
                "name": "Manufacturer",
                "description": "Add and Manage Manufacturer as Party",
                "price": {
                  "slab1": 10000
                }
              },
              {
                "name": "Employee (without HCM/Payroll Module)",
                "description": "Add and Manage Employees in details without HCM ",
                "price": {
                  "slab1": 10000
                }
              }
            ],
            "description": "Manage your parties with their very own portals"
          },
          {
            "code": "MCL",
            "name": "Multi Currency Ledger",
            "submodules": [],
            "features": [
              {
                "name": "Multi-Currency in Ledger",
                "description": "Integration of Multiple Currency Conversions and Rates in Ledger Books"
              },
              {
                "name": "Multi Currency Financial Reports",
                "description": "Integration of Multiple Currency Conversion and Rates in Financial Reports"
              }
            ],
            "description": "Provision of multiple currencies for your ledgers and Financial reports",
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
                "name": "2-Way Voucher Approval",
                "description": "Bi layered Approval Process for Vouchers: Accept & Approve"
              }
            ],
            "description": "Voucher Approval Process Simplified!",
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
                "name": "Cashbook and Bankbook",
                "description": "Access Branch wise Cashbook and Bankbook"
              },
              {
                "name": "Branchwise Ledger Access Control",
                "description": "Access Branch wise Ledger"
              },
              {
                "name": "Customers",
                "description": "Access Branch wise Customers",
                "price": {
                  "slab1": 30000,
                  "slab2": 75000,
                  "slab3": 200000
                }
              },
              {
                "name": "Vendors",
                "description": "Access Branch wise Vendors",
                "price": {
                  "slab1": 30000,
                  "slab2": 75000,
                  "slab3": 200000
                }
              }
            ],
            "description": "Control Branch wise Account Access with astute security",
            "price": {
              "multiplier": "branches",
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
                "name": "Multi-Branch Support in Ledger and Voucher",
                "description": "Access and Manage multiple  Ledgers and Vouchers for multiple Branches"
              },
              {
                "name": "MultiBranch Seggregated Chart of Accounts and Financial Statements",
                "description": "Access and Manage Chart of Accounts and Financial Statements from multiple branches into a Seggregated form."
              }
            ],
            "description": "Maintain Ledgers for mutiple branches",
            "price": {
              "multiplier": "branches",
              "slab1": 30000,
              "slab2": 75000,
              "slab3": 200000
            }
          }
        ],
        "multipliers": [
          {
            "code": "accounts",
            "increment": "fixed",
            "label": "Accounts",
            "slabs": [
              400,
              800,
              1200
            ],
            "name": "params.accounts.FA"
          },
          {
            "code": "branch",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              4,
              8
            ],
            "name": "params.branch.FA"
          }
        ]
      },
      {
        "name": "Cost Accounting",
        "code": "CA",
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
            "description": "Maintain Cost Centers for each of your projects",
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
            "ready": "x",
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
                "name": "Financial Account based Budget",
                "description": "Track and Maintain Budgets according to your Bank Account and Account Type"
              },
              {
                "name": "Departmentwise Expense Budget",
                "description": "View Department wise Budgets"
              },
              {
                "name": "Branchwise Budget",
                "description": " View Branch wise Budgets"
              }
            ],
            "description": "Draw up your very own budget tree in a jiffy!",
            "price": {
              "slab1": 80000
            }
          }
        ],
        "multipliers": [
          {
            "code": "accounts",
            "increment": "fixed",
            "label": "Accounts",
            "slabs": [
              400,
              800,
              1200
            ],
            "name": "params.accounts.CA"
          },
          {
            "code": "branch",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              4,
              8
            ],
            "name": "params.branch.CA"
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
        "code": "SM",
        "modules": [
          {
            "code": "SI",
            "name": "Sales Invoice",
            "submodules": [
              {
                "name": "General",
                "features": [
                  {
                    "name": "Product or Service Sales",
                    "description": "Sell your products or services"
                  },
                  {
                    "name": "Product wise Discount",
                    "description": "Manage indivual product dicsounts",
                    "price": {
                      "slab1": 2000
                    }
                  },
                  {
                    "name": "Account configuration in SI",
                    "description": "Automated accounting integration configuration",
                    "price": {
                      "slab1": 2000
                    }
                  },
                  {
                    "name": "Barcode Integration",
                    "description": "Use barcode to add product in invoice",
                    "price": {
                      "slab1": 2000
                    }
                  },
                  {
                    "name": "Carton (full/partial) Quantity",
                    "description": "Manage carton / individual products for invoice",
                    "price": {
                      "slab1": 8000
                    }
                  },
                  {
                    "name": "Product Image Integration",
                    "description": "Show image in product grid",
                    "price": {
                      "slab1": 8000
                    }
                  }
                ],
                "description": "Core features of Invoice system"
              },
              {
                "name": "Payment",
                "features": [
                  {
                    "name": "Down Payment, Auto Full Payment",
                    "description": "Full or partial Payment with your invoice"
                  },
                  {
                    "name": "Multiple and Mixed Payment (Pay by Cash, Credit or Bkash)",
                    "description": "Take partial payment with Cash/Card or others",
                    "price": {
                      "slab1": 8000
                    }
                  }
                ],
                "description": "Take Payment with Invoice"
              },
              {
                "name": "Internal Integrations",
                "features": [
                  {
                    "name": "Create SI from SO",
                    "description": "Create sale invoice from sale order",
                    "price": {
                      "slab1": 2000
                    }
                  },
                  {
                    "name": "Create SI from Delivery",
                    "description": "Create sale invoice from delivery",
                    "price": {
                      "slab1": 2000
                    }
                  }
                ]
              },
              {
                "name": "Extension",
                "features": [
                  {
                    "name": "Terms and Condition Management",
                    "description": "Manage Terms and Conditions for Invoice",
                    "price": {
                      "slab1": 4000
                    }
                  },
                  {
                    "name": "2-3-4-way matching",
                    "description": "Match Invoices to Sale Orders, Receive Information and Inspect Information, Verify and Approve as applicable"
                  }
                ]
              },
              {
                "name": "Advanced Features",
                "features": [
                  {
                    "name": "Multiple Format Sales Invoice",
                    "description": "Print invoice in multiple formats",
                    "price": {
                      "slab1": 16000
                    }
                  },
                  {
                    "name": "Product Revenue Seggeration",
                    "description": "Segregate Product wise sales accounts",
                    "price": {
                      "slab1": 4000
                    }
                  }
                ]
              }
            ],
            "features": [],
            "description": "Manage your Invoices",
            "price": {
              "slab1": 20000
            }
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
                "name": "Manage 5K invoice/day",
                "price": {
                  "slab1": 600000
                }
              },
              {
                "name": "Manage 10K invoice/day",
                "price": {
                  "slab1": 900000
                }
              },
              {
                "name": "Manage 15K invoice/day",
                "price": {
                  "slab1": 1500000
                }
              }
            ],
            "description": "Data Caching and Processing optimizations for HIgh volume sales invoices",
            "price": {
              "slab1": 300000
            }
          },
          {
            "code": "SVAT",
            "name": "Sales VAT",
            "submodules": [],
            "features": [
              {
                "name": "VAT on Sales Invoice",
                "description": "Implement VAT on your Sales Invoice with the click of a button"
              },
              {
                "name": "Daily and Monthly VAT Summary",
                "description": "View Daily and Monthly VAT Summary of your products"
              },
              {
                "name": "Sales VAT Accounting Integration",
                "description": "Automatic Accounting Integration for Sales VAT"
              },
              {
                "name": "Musok 6.3",
                "description": "Implement Mushak 6.3-Tax Challan from your Sales"
              },
              {
                "name": "PrismVAT Integration",
                "description": "Well Developed PrismVAT Integration with PrismERP",
                "price": {
                  "slab1": 48000
                }
              }
            ],
            "description": "Configure and Collect your Sales VAT",
            "price": {
              "slab1": 16000
            }
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
                "name": "Sales Cancellation (with Order)",
                "description": "Cancel your Sales as per Sale Orders"
              },
              {
                "name": "Product Variant Integration",
                "description": "Integration of Product Variant with Sales Cancellations"
              },
              {
                "name": "Cancellation without Order",
                "description": "Cancel your Sales without Sale Order"
              }
            ],
            "description": "Manage and Maintain Sale Order Cancellations"
          },
          {
            "code": "SDC",
            "name": "Sale Delivery Challan",
            "submodules": [],
            "features": [
              {
                "name": "Sales Delivery Challan Management",
                "description": "Core  Features of Sales Delivery Challan Management"
              },
              {
                "name": "2-way matching",
                "description": "Bi-layered matching of Sales Delivery with their corresponding Sale Orders"
              },
              {
                "name": "Delivery Return",
                "description": "Maintain Delivery of Returned Goods"
              },
              {
                "name": "Challan Without Invoice (Delivery Order)",
                "description": "Maintain Delivery Challan wihout prior Delivery orders",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Instant Delivery on Invoice",
                "description": "Provision of Instant Delivery option in invoices",
                "price": {
                  "slab1": 4000
                }
              },
              {
                "name": "Gatepass",
                "description": "Maintain Gatepass from your factory when taking out products",
                "price": {
                  "slab1": 8000
                }
              },
              {
                "name": "Delivery Order",
                "description": "Add and manage Delivery Orders for your Products",
                "price": {
                  "slab1": 16000
                }
              }
            ],
            "description": "Manage Challan for Sale Deliveries ",
            "price": {
              "slab1": 16000
            }
          },
          {
            "code": "PP",
            "name": "Product Pricing",
            "submodules": [],
            "features": [
              {
                "name": "Time Based Product Price",
                "ready": "x",
                "description": "Set and Manage Product Prices as per different time frames"
              },
              {
                "name": "Customer Category wise Product Price",
                "description": "Set the Price of your products as per Customer Category",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Variant wise Price (1 variant)",
                "description": "Set variant wise Price to your products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Different Price for Branch",
                "description": "Set seperate Branch wise Price of your products",
                "price": {
                  "slab1": 48000
                }
              },
              {
                "name": "Vendor / Barcode based Pricing",
                "description": "Set Vendor wise or Barcode wise Price to your products",
                "price": {
                  "slab1": 48000
                }
              },
              {
                "name": "Product Price Range Limit",
                "description": "Set a price range limit to your products",
                "price": {
                  "slab1": 48000
                }
              }
            ],
            "description": "Manage Prices of your Products in intricate details",
            "price": {
              "slab1": 48000
            }
          },
          {
            "code": "PPD",
            "name": "Product Promotion & Discount",
            "submodules": [],
            "features": [
              {
                "name": "General Discount",
                "description": "Set and Apply General Discount to your products"
              },
              {
                "name": "Trade Discount",
                "description": "Set and Apply Trade Discount (for Vendors) to your products"
              },
              {
                "name": "Bulk Update General and Trade Discount",
                "description": "Set and Apply General and Trade Dsicounts to bulk quantities of products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Coupon Discount",
                "description": "Set Discount Coupons for your products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Promotional Gift(Gift Voucher)",
                "description": "Apply Promotional gifts or gift Vouchers to your products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Free Product",
                "description": "Set Incentive of Free Product to your products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Bulk Quantity Promotions",
                "description": "Set Promotions to a Bulk Quantitiy of Products",
                "price": {
                  "slab1": 16000
                }
              },
              {
                "name": "Membership Card Discounts",
                "description": "Set and Apply Membership Cards for Discounts",
                "price": {
                  "slab1": 16000
                }
              }
            ],
            "description": "Manage Promotions and Discounts for your products",
            "price": {
              "slab1": 16000
            }
          },
          {
            "code": "CC",
            "name": "Credit Control",
            "submodules": [],
            "features": [
              {
                "name": "Customer Credit Limit",
                "description": "Set and Monitor Credit Limit for your Customers"
              },
              {
                "name": "Block Credit Limit on Credit Receipt Days",
                "description": "Block Credit Limit of Party after exceeding Credit Days"
              },
              {
                "name": "Batch Credit Limit Update Based on Sales Rate",
                "description": "Update Credit Limit automatically as per average Sales rate of Customer",
                "price": {
                  "slab1": 12000
                }
              },
              {
                "name": "File Upload for Credit Limit",
                "description": "Upload Files to set Credit Limit",
                "price": {
                  "slab1": 36000
                }
              }
            ],
            "description": "Control and Monitor Credit Limits of your Customers and Vendors ",
            "price": {
              "slab1": 48000
            }
          },
          {
            "code": "IST",
            "name": "InStore Processing",
            "submodules": [],
            "features": [
              {
                "name": "Auto Calculation of Product values",
                "description": "Automatically Calculate Product Values as per Instore Processing"
              }
            ],
            "description": "Manage breakdown or Processing of Products in Inventory",
            "price": {
              "slab1": 20000
            }
          },
          {
            "code": "SSRL",
            "name": "Sales Product Serial",
            "submodules": [],
            "features": [
              {
                "name": "Serial on Sales Invoice",
                "description": "Assign Serials on Sales Invoice"
              },
              {
                "name": "Stock Validation for serial for Delivery Challan",
                "description": "Maintain and Validate Stock as per Serial Numbers for Delivery Challan"
              },
              {
                "name": "Range Serial on Sales Delivery Challan",
                "description": "Set Serial range for Sales Delivery Challan",
                "price": {
                  "slab1": 48000
                }
              },
              {
                "name": "Delivery Challan Serial on Packing List",
                "description": "Set Serial on Packing List for Delivery Challan",
                "price": {
                  "slab1": 8000
                }
              },
              {
                "name": "Delivery Challan Serial Export",
                "description": "Export Serials assign to products for Delivery Challan",
                "price": {
                  "slab1": 8000
                }
              },
              {
                "name": "Multiple Serial for single Product",
                "description": "Assign Multiple Serial Numbers to a single Product",
                "price": {
                  "slab1": 48000
                }
              }
            ],
            "description": "Set and Maintain Serials numbers to Products for Sale",
            "price": {
              "slab1": 96000
            }
          },
          {
            "code": "DPL",
            "name": "Delivery Packing List",
            "submodules": [],
            "features": [
              {
                "name": "Carton Capacity Management",
                "ready": "x",
                "description": "Maintain carton capacity before delivering your products"
              },
              {
                "name": "Generate Carton Number for Delivery Challan",
                "description": "Generate the number of Cartons per delivery Challan"
              },
              {
                "name": "Packing List Printing",
                "description": "Works just like a Gatepass"
              },
              {
                "name": "Integration with Serial Management",
                "description": "Assign Serials to Producrs before delivery",
                "price": {
                  "slab1": 48000
                }
              }
            ]
          },
          {
            "code": "PV",
            "name": "Product Variant Integration",
            "submodules": [],
            "features": [
              {
                "name": "Multilevel variant support on Product Configuration",
                "description": "Set multi layered Variants to Products"
              },
              {
                "name": "Sales Invoice",
                "description": "Set Product Variant in Sales Invoices"
              },
              {
                "name": "Sales Cancellation",
                "description": "Set Product Variant in Sales Cancellations"
              },
              {
                "name": "Product Pricing",
                "description": "Set Product Price as per Variants"
              },
              {
                "name": "Promotion and Discount",
                "description": "Set Product Variant wise Promotion and Discount"
              },
              {
                "name": "Inventory",
                "description": "Monitor Variant wise Products from Inventory"
              },
              {
                "name": "Purchase Order",
                "description": "Create Product Variant wise Purchase Orders "
              },
              {
                "name": "Purchase Invoice",
                "description": "Create Product Variant wise Purchase Invoices"
              },
              {
                "name": "Purchase Cancellation",
                "description": "Create Product Variant wise Purchase Cancellation ",
                "price": {
                  "slab1": 48000
                }
              }
            ],
            "description": "Application of Product Variants (Color, Size etc.)to Products",
            "price": {
              "slab1": 96000
            }
          },
          {
            "code": "SHP",
            "name": "Shipment",
            "submodules": [],
            "features": [
              {
                "name": "Schedule Sales Delivery Challan on Planned dates",
                "description": "Schedule Sales Delivery challan according to your designated dates"
              }
            ],
            "description": "Monitor and Track Shipment of your deliveries",
            "price": {
              "slab1": 48000
            }
          },
          {
            "code": "CCM",
            "name": "Customer Category Management",
            "submodules": [],
            "features": [
              {
                "name": "Customer Category Management",
                "description": "Add, View and assign Customer Category to Customers"
              }
            ],
            "description": "Manage Customer Categories",
            "price": {
              "slab1": 48000
            }
          }
        ],
        "multipliers": [
          {
            "code": "invoices",
            "increment": "fixed",
            "label": "Invoices",
            "slabs": [
              500,
              2000,
              5000
            ],
            "name": "params.invoices.SM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              5,
              15
            ],
            "name": "params.branches.SM"
          }
        ]
      },
      {
        "name": "LC Management (Export)",
        "code": "LM(",
        "modules": [
          {
            "code": "LCE",
            "name": "LC Management",
            "submodules": [],
            "features": [
              {
                "name": "Commercial Invoice",
                "description": "Create, Monitor and Assign Commercial Invoices "
              },
              {
                "name": "Proforma Invoice",
                "description": "Create, Monitor and Assign Proforma Invoice"
              },
              {
                "name": "Work Order",
                "description": "Create, Monitor and Assign Work Orders as per LC"
              },
              {
                "name": "Export LC",
                "description": "Create and Monitor Export LC Management"
              },
              {
                "name": "Sales Contract",
                "description": "Create and Manage Sales Contracts as per LC"
              }
            ],
            "description": "Run LC of your business comprehensively",
            "price": {
              "slab1": 200000
            }
          },
          {
            "code": "LCBL",
            "name": "Business Loan Integration with LC Management",
            "submodules": [],
            "features": [],
            "description": "Manage Business Loans for LC Management",
            "price": {
              "slab1": 96000
            }
          }
        ],
        "multipliers": [
          {
            "code": "invoices",
            "increment": "fixed",
            "label": "Invoices",
            "slabs": [
              500,
              2000,
              5000
            ],
            "name": "params.invoices.LM("
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              5,
              15
            ],
            "name": "params.branches.LM("
          }
        ]
      },
      {
        "name": "Distribution Management",
        "code": "DM",
        "modules": [
          {
            "code": "TM",
            "name": "Territory Management",
            "submodules": [],
            "features": [
              {
                "name": "Territory Management",
                "description": "Add and manage Territories"
              },
              {
                "name": "Territory wise Sales & Collection Report",
                "description": "Manage and View Territory wise Sales and Collection reports"
              },
              {
                "name": "Supervisor/Manager Management",
                "description": "Add and Assign Superisor/Manager to Territories"
              }
            ],
            "description": "Manage Territories for Sales as well as assigning Team Members",
            "price": {
              "slab1": 100000
            }
          },
          {
            "code": "DS",
            "name": "Secondary Sales",
            "submodules": [],
            "features": [
              {
                "name": "Secondary Invoice",
                "description": "Track and Manage Sales made to Dealers/Distributors"
              },
              {
                "name": "Secondary Customer Management",
                "description": "Manage your Delaers/Distributors with whom you'd be doing Sales with."
              }
            ],
            "description": "(Requires Integration with Dealer's ERP)",
            "price": {
              "slab1": 200000
            }
          },
          {
            "code": "DI",
            "name": "Secondary Inventory Management",
            "submodules": [],
            "features": [
              {
                "name": "Secondary Inventory",
                "description": "Track and Manage Delaers'/Distributors' Stock comprehensively. "
              },
              {
                "name": "Integration with Secondary Sales",
                "description": "Foment Sales from the Dealers'/Distributors' Inventory."
              },
              {
                "name": "Secondary Delivery Challan",
                "description": "Track and Maintain Delivery of Dealers'/Distributors' sold Products"
              }
            ],
            "description": "(Requires Integration with Dealer's ERP)",
            "price": {
              "slab1": 150000
            }
          }
        ],
        "multipliers": [
          {
            "code": "invoices",
            "increment": "fixed",
            "label": "Invoices",
            "slabs": [
              500,
              2000,
              5000
            ],
            "name": "params.invoices.DM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              5,
              15
            ],
            "name": "params.branches.DM"
          }
        ]
      },
      {
        "name": "Sales Force Automation",
        "code": "SFA",
        "modules": [
          {
            "code": "SP",
            "name": "Sales Planning",
            "submodules": [],
            "features": [
              {
                "name": "Demand Forcasting",
                "ready": "x",
                "description": "Foreacast your yearly to weekly sales demands."
              },
              {
                "name": "Territorywise Demand Forcasting",
                "ready": "x",
                "description": "Forecast and analyze Territory wise Sales Demand"
              },
              {
                "name": "Individual Target and Achievement",
                "description": "Set Individual Target and Achievement to Sales Persons"
              },
              {
                "name": "Territorywise Target and Achievement",
                "description": "Ser Territory wise Target and Achievement to Sales Team Members"
              }
            ],
            "description": "Forecast and Plan your upcoming sales in terms of Demand",
            "price": {
              "slab1": 350000
            }
          },
          {
            "code": "SC",
            "name": "Sales Commission",
            "submodules": [],
            "features": [
              {
                "name": "Sales Incentive and Commission Management",
                "description": "Assign and Manage Commissions Targets to your Sales Members"
              },
              {
                "name": "Distributor Commission Management",
                "ready": "x",
                "description": "Assign and Manage Commissions Targets to your Distributors"
              },
              {
                "name": "Commission Provisioning on SI",
                "description": "Allow Provision of Setting Commission Rate for Sale Invoices"
              }
            ],
            "price": {
              "slab1": 200000
            }
          }
        ],
        "multipliers": [
          {
            "code": "invoices",
            "increment": "fixed",
            "label": "Invoices",
            "slabs": [
              500,
              2000,
              5000
            ],
            "name": "params.invoices.SFA"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              5,
              15
            ],
            "name": "params.branches.SFA"
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
        "code": "C",
        "modules": [],
        "price": {
          "slab1": "not available",
          "slab2": "charged as man-days",
          "slab3": "charged as man-days"
        },
        "multipliers": []
      },
      {
        "name": "Service Billing",
        "code": "SB",
        "modules": [
          {
            "code": "SBI",
            "name": "Service Billing Invoice",
            "submodules": [],
            "features": [
              {
                "name": "Service Invoice",
                "description": "Create and Manage Service Invoices"
              },
              {
                "name": "Service Management",
                "description": "Add, Manage and Maintain Services as per your business "
              },
              {
                "name": "Service Dashboard",
                "description": "Track your Service Operations from a single portal"
              },
              {
                "name": "Service Multi-unit",
                "description": "Select and Disburse Multiple Service Units",
                "price": {
                  "slab3": 96000
                }
              }
            ],
            "description": "Maintain and Manage Invoices for Services",
            "price": {
              "slab3": 96000
            }
          },
          {
            "code": "SBAB",
            "name": "Service Bill Generation",
            "submodules": [],
            "features": [
              {
                "name": "Bill Generation",
                "description": "Core Features of Bill Generations"
              },
              {
                "name": "Bill Notice via Email / SMS",
                "description": "Get Notified of your Service Bills via Email/SMS",
                "price": {
                  "slab3": 16000
                }
              },
              {
                "name": "Auto Invoice Email to Customer",
                "description": "Allow Provision to Automatically send Email Notifications to Customers for Sale Invoices",
                "price": {
                  "slab3": 32000
                }
              },
              {
                "name": "Partial Billing for Service Upgrade/Downgrade",
                "description": "Partial Payment for upgarding or downgrading a service",
                "price": {
                  "slab3": 24000
                }
              }
            ],
            "description": "In-depth and Accurate Service Bill Generation",
            "price": {
              "slab3": 192000
            }
          },
          {
            "code": "SBSM",
            "name": "Subscriber Management",
            "submodules": [],
            "features": [
              {
                "name": "Subscriber Management",
                "description": "Core Features of Subscriber Management"
              },
              {
                "name": "Packages & Contract Management",
                "description": "Manage your Packages and Contracts according to your services"
              },
              {
                "name": "Subscriber Contract Management",
                "description": "Manage contracts assigned to your subscribers"
              },
              {
                "name": "Service Upgrade/Downgrade",
                "description": "Upgrade or Downgrade your Services"
              }
            ],
            "description": "Manage your Service Subscribers with ease",
            "price": {
              "slab3": 96000
            }
          }
        ],
        "multipliers": []
      },
      {
        "name": "Sales CRM",
        "code": "SC",
        "modules": [
          {
            "code": "CM",
            "name": "Campaign Management",
            "submodules": [],
            "features": [],
            "description": "Add and Manage Project Campaigns of your business",
            "price": {
              "slab3": 16000
            }
          },
          {
            "code": "LM",
            "name": "Lead Management",
            "submodules": [],
            "features": [],
            "description": "Add and Manage from Potential to Mature Leads ",
            "price": {
              "slab3": 16000
            }
          },
          {
            "code": "ACT",
            "name": "Activity Management",
            "submodules": [],
            "features": [],
            "description": "Add and Assign Activities to your Employees",
            "price": {
              "slab3": 16000
            }
          },
          {
            "code": "QTM",
            "name": "Quotation Management",
            "submodules": [],
            "features": [],
            "description": "Manage Quotations for your campaigns",
            "price": {
              "slab3": 16000
            }
          },
          {
            "code": "SVY",
            "name": "Servey Management",
            "submodules": [],
            "features": [],
            "description": "Add and Maintain Survey for your campaigns",
            "price": {
              "slab3": 16000
            }
          },
          {
            "code": "BM",
            "name": "Booking Management",
            "submodules": [],
            "features": [
              {
                "name": "Book Product on Inventory",
                "description": "Book To-Be-Sold Products from your inventory"
              },
              {
                "name": "Booking Production Capacity",
                "description": "Manage Booking Production Capacity of Products from your Inventory"
              }
            ],
            "ready": "x",
            "price": {
              "slab3": 48000
            }
          }
        ],
        "multipliers": []
      },
      {
        "name": "Product Support",
        "code": "PS",
        "modules": [
          {
            "code": "STS",
            "name": "Support Ticketing System",
            "submodules": [],
            "features": [],
            "description": "Maintain dedicated and well furnished Ticketing System for Support",
            "price": {
              "slab3": 128000
            }
          },
          {
            "code": "RMA",
            "name": "Return Merchandise Authorization",
            "submodules": [],
            "features": [
              {
                "name": "RMA",
                "description": "Core Features of Warranty Services"
              },
              {
                "name": "Non Serial RMA",
                "description": "Manage Warranty Services of Non-Serial Products"
              },
              {
                "name": "Serial Product RMA",
                "description": "Manage Warranty Services of Serialized Products"
              },
              {
                "name": "Warranty Claim / Repair Servicing",
                "description": "Manage Waranty Claims or Servicing of your products"
              },
              {
                "name": "Product Performance Analysis",
                "description": "Documented Version of an Analysis based on you Product Performance "
              },
              {
                "name": "RMA Invoice",
                "description": "Manage Invoices for your Warranty Services"
              },
              {
                "name": "Replacement Claim and Charge Provision",
                "description": "Demand Claim for replacement and necessary charges"
              },
              {
                "name": "Repair Servicing Spare Parts Management / Warranty Spare Consumption",
                "description": "Track and Manage Spare Parts Consumption or relevant Repair Services",
                "price": {
                  "slab3": 96000
                }
              },
              {
                "name": "Third Party Serial Servicing Provision",
                "description": "Manage Serial wise Third Party Servicing Claims",
                "price": {
                  "slab3": 48000
                }
              },
              {
                "name": "SMS / Email Integration on State Change",
                "description": "Implement SMS/Email Notifications on Status of your Warranty Service",
                "price": {
                  "slab3": 48000
                }
              }
            ],
            "description": "Monitor and Maintain Warranty Services of your products",
            "price": {
              "slab3": 128000
            }
          },
          {
            "code": "LP",
            "name": "Lease Product",
            "submodules": [],
            "features": [
              {
                "name": "Lease Product to Customer"
              }
            ],
            "ready": "x",
            "price": {
              "slab3": 96000
            }
          }
        ],
        "multipliers": []
      }
    ]
  },
  {
    "code": "SCM",
    "name": "Supply Chain Management",
    "moduleGroups": [
      {
        "name": "Purchasing",
        "code": "P",
        "modules": [
          {
            "code": "PI",
            "name": "Purchase Invoice",
            "submodules": [],
            "features": [
              {
                "name": "Product or Service Purchase",
                "description": "Purchase Products or Services with great ease."
              },
              {
                "name": "Account configuration in PI",
                "description": "Configure Accounting Settings in PI"
              },
              {
                "name": "2-3-4-way matching",
                "description": "Match Invoices to Purchase Orders, Receive Information and Inspect Information, Verify and Approve as applicable"
              },
              {
                "name": "Create PI from PO",
                "description": "Create Purchase Invoice as per Purchase Orders"
              },
              {
                "name": "Create PI from Delivery",
                "description": "Create Purchase Invoices from Delivery Orders"
              }
            ],
            "description": "Manage your Purchase Invoices"
          },
          {
            "code": "PVAT",
            "name": "Purchase VAT",
            "submodules": [],
            "features": [
              {
                "name": "VAT on Purchase Invoice",
                "description": "Apply VAT on Purchase Invoice"
              },
              {
                "name": "Daily and Monthly VAT Summary",
                "description": "View Daily and Monthly VAT Summary"
              },
              {
                "name": "Purchase VAT Accounting Integration",
                "description": "Integrate VAT Accounting with your purchases"
              }
            ],
            "description": "Maintain VAT in Purchasing Operations"
          },
          {
            "code": "PWO",
            "name": "Purchase Order Management",
            "submodules": [],
            "features": [
              {
                "name": "Managet Purchase Order",
                "description": "Create Purchase Orders with as significant fields of information."
              },
              {
                "name": "Create PO from Quotation",
                "ready": "*",
                "description": "Create Purchase Orders from the corresponding Quotations"
              }
            ],
            "description": "Manage Purchase Orders "
          },
          {
            "code": "PC",
            "name": "Purchase Cancellation",
            "submodules": [],
            "features": [
              {
                "name": "Purchase Cancellation",
                "description": "Add and Manage your purchase cancellations based on Invoice/Order/Re"
              }
            ],
            "description": "Cancel your Purchases in a jiffy!"
          },
          {
            "code": "GRN",
            "name": "Goods Receive Note",
            "submodules": [],
            "features": [
              {
                "name": "Goods Receive Note Management",
                "description": "Manage and View Report after Delivery of your Goods."
              },
              {
                "name": "2-way matching",
                "description": "Match Purchase Invoices to Delivery Vouchers, Verify and Approve as applicable"
              },
              {
                "name": "Purchase Return",
                "description": "Manage and Return any damaged or defected Products"
              },
              {
                "name": "Delivery Challan Without PI",
                "ready": "*",
                "description": "Create Delivery Challan without the referernce of Purchase Invoices"
              },
              {
                "name": "Create PI from GRN",
                "ready": "*",
                "description": "Create and Manage Puchase Invoices as per your Delivery Challan"
              },
              {
                "name": "Auto create GRN on PI",
                "ready": "*",
                "description": "Provision of Creation of GRN automatically b"
              }
            ]
          },
          {
            "code": "PSRL",
            "name": "Purchase Product Serial",
            "submodules": [],
            "features": [],
            "description": "Maintain Product Serials for Purchase Invoices/Orders"
          },
          {
            "code": "PWTY",
            "name": "Purchase Warranty Management",
            "submodules": [],
            "features": [],
            "description": "Manage and Maintain Warrant Services for Purchased Products"
          }
        ],
        "multipliers": []
      },
      {
        "name": "Inventory and Warehouse Management",
        "code": "IaWM",
        "modules": [
          {
            "code": "IC",
            "name": "Inventory Control",
            "submodules": [],
            "features": [
              {
                "name": "Material Management",
                "description": "Add Products and Materials to your Inventory"
              },
              {
                "name": "Stock In, Stock Out",
                "description": "Add products to your Inventory and Take them out at your convenience!"
              },
              {
                "name": "Reorder Product",
                "description": "Set notifications to reorder product when nearing stock out"
              },
              {
                "name": "Stock Transfer",
                "description": "Transfer your products from one inventory to another with great ease!"
              },
              {
                "name": "Stock Disposal",
                "description": "Dispose of products from your inventory "
              },
              {
                "name": "Branch Stock Transfer",
                "description": "Transfer products from one branch to another"
              },
              {
                "name": "Inventory Recalculation",
                "description": "Recalculate your stock value after update in price or products"
              },
              {
                "name": "Inventory Reconciliation",
                "description": "match your inventory to a written record involving counting damaged or outdated products as well as those available for sale in current stock"
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
            ],
            "ready": "x",
            "description": "Comprehensive management of your lots"
          },
          {
            "code": "ICSRL",
            "name": "Serial Management",
            "submodules": [],
            "features": [
              {
                "name": "Serial Management",
                "description": "Core Features of Product Serial Management"
              },
              {
                "name": "Secondary Serial Management",
                "ready": "x"
              },
              {
                "name": "Serial in Stock Check",
                "description": "Check assigned product serials in your stock"
              },
              {
                "name": "Optimized Serial Storage (for 1000000+ serials)",
                "ready": "x",
                "description": "Provision to assign 1000000+ serials "
              }
            ],
            "description": "Manage Serials of products from Inventory"
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
            ],
            "ready": "x"
          },
          {
            "code": "WMS",
            "name": "Warehouse Management System",
            "submodules": [],
            "features": [
              {
                "name": "Warehouse Management System"
              }
            ],
            "ready": "x"
          }
        ],
        "description": "Manage your inventory/Warehouse from a single frame!",
        "multipliers": []
      },
      {
        "name": "Supply Chain Management",
        "code": "SCM",
        "modules": [
          {
            "code": "PRRQ",
            "name": "Product Requisition",
            "submodules": [],
            "features": [],
            "description": "Carry out and Manage Requisitions for products you wish to purchase"
          },
          {
            "code": "PREQ",
            "name": "Purchase Request",
            "submodules": [],
            "features": [],
            "description": "Create Purchase Requests for your requisitioned products"
          },
          {
            "code": "QTC",
            "name": "Quotation Comparison",
            "submodules": [],
            "features": [],
            "description": "Compare Quotations from your vendors"
          },
          {
            "code": "SCM",
            "name": "Supply Chain Management",
            "submodules": [],
            "features": [
              {
                "name": "Purchase Cost Analysis",
                "description": "View Analysis of purchase costs"
              }
            ]
          },
          {
            "code": "PQC",
            "name": "Purchase Quatlity Control",
            "submodules": [],
            "features": [],
            "description": "x"
          }
        ],
        "multipliers": []
      },
      {
        "name": "Foreign Purchase",
        "code": "FP",
        "modules": [
          {
            "code": "LCI",
            "name": "Purchase LC (Import)",
            "submodules": [],
            "features": [],
            "description": "Conduct Import LC from a single Platform!"
          }
        ],
        "multipliers": []
      }
    ]
  },
  {
    "code": "HCM",
    "name": "Procurement and Material Management",
    "moduleGroups": [
      {
        "name": "Employee Management",
        "code": "EM",
        "modules": [
          {
            "code": "PIM",
            "name": "Personal Information Management",
            "submodules": [],
            "features": [
              {
                "name": "Department Master Data",
                "description": "Create and Manage your Organization's departments"
              },
              {
                "name": "Designation Master Data",
                "description": "Create and Manage your Employees Designations"
              },
              {
                "name": "Employee Profile",
                "description": "Create and Track entire profile of your employees"
              },
              {
                "name": "Activation/Deactivation",
                "description": "Activate/Deactivate Employee "
              }
            ],
            "description": "Manage information of your employees and their relevant fields",
            "price": {
              "slab1": 100,
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          },
          {
            "code": "PIMX",
            "name": "Extended PIM",
            "submodules": [],
            "features": [
              {
                "name": "Employee Qualifications Management",
                "description": "Add and Manage Employee Qualifications"
              },
              {
                "name": "Employee Documents Management",
                "description": "Add and Manage Documents related to Employees",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              },
              {
                "name": "Employee Signature Management",
                "description": "Add and Manage Signatures of your Employees",
                "price": {
                  "slab1": 200,
                  "slab2": 280,
                  "slab3": 560,
                  "slab4": 840,
                  "slab5": 1428.0,
                  "slab6": 2840,
                  "slab7": 5000
                }
              }
            ]
          },
          {
            "code": "EM",
            "name": "Employment Management",
            "submodules": [],
            "features": [
              {
                "name": "Employement Information/History",
                "description": "Manage Employee Information and History "
              },
              {
                "name": "Branch Transfer Management",
                "description": "Transfer your Employees from one Branch to another ",
                "price": {
                  "slab1": 120,
                  "slab2": 150,
                  "slab3": 300,
                  "slab4": 750,
                  "slab5": 1500.0
                }
              },
              {
                "name": "Department Transfer",
                "description": "Transfer your Employee from one Department to another"
              }
            ]
          },
          {
            "code": "ESP",
            "name": "Employee Separation",
            "submodules": [],
            "features": [
              {
                "name": "Advanced Final Settlement",
                "description": "Manage Resignations, Terminations and Retirements all at once!",
                "price": {
                  "slab1": 300,
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Exit Clearance",
                "description": "Add and Manage Exit Clearance of your employees",
                "price": {
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Template Management",
                "description": "Pre-Custom Templates for Exit Clearance"
              },
              {
                "name": "Assigned Manager Portal",
                "description": "View Manager Portal assigned to your Employee"
              },
              {
                "name": "Bill Processing",
                "description": "Maintain Bill Processing Operations of your Employees before Seperation",
                "price": {
                  "slab2": 280,
                  "slab3": 560,
                  "slab4": 840,
                  "slab5": 1428.0,
                  "slab6": 2840,
                  "slab7": 5000
                }
              }
            ],
            "description": "Manage Employee Seperation from one Frame!"
          },
          {
            "code": "PRFA",
            "name": "Performance Appraisal",
            "submodules": [],
            "features": [
              {
                "name": "Upcoming Appraisals",
                "description": "View Upcoming Appraisals fo your Employees"
              },
              {
                "name": "Individual Employee Performance Appraisal",
                "description": "Manage Individual Performance Appraisal of your Employee"
              },
              {
                "name": "Performance Appraisal Score",
                "description": "Set and Maintain Performance Appraisal Scores of your Employees"
              },
              {
                "name": "Appraisal Approval Layers",
                "description": "Wide Range of Approval Layer to approve or verify appraisals"
              },
              {
                "name": "Appraisal Pending for Scoring",
                "description": "View Pending Appraisals for Scoring"
              },
              {
                "name": "Performance Appraisal Evaluation",
                "description": "Evaluate Performance Appraisal of your Employees"
              },
              {
                "name": "Performance Rating System",
                "description": "Set Performance Rating to assess Employees"
              },
              {
                "name": "Performance Criteria (Single or Group)",
                "description": "Set Performance Criteria to assess Employees"
              },
              {
                "name": "Performance Appraisal Form",
                "description": "Set up customized Performance Appraisal Form for your Employees"
              },
              {
                "name": "Performance Criteria Group Weightage",
                "description": "Assign Weights to Performance Criteria Groups for uniform pointage"
              }
            ],
            "description": "Settle Performance Appraisals of your Employees with ease",
            "price": {
              "slab1": 300,
              "slab2": 420,
              "slab3": 840,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          },
          {
            "code": "IDC",
            "name": "ID Card Management",
            "submodules": [],
            "features": [
              {
                "name": "Employee ID Card Generation",
                "description": "Generate ID Cards of your Employees with a single click",
                "price": {
                  "slab1": " "
                }
              },
              {
                "name": "Visitor ID Card Management",
                "ready": "x"
              }
            ],
            "description": "Manage and View ID Cards of your Employees",
            "price": {
              "slab1": 100,
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          }
        ],
        "description": "Manage your employees from a single frame!",
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.EM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.EM"
          }
        ]
      },
      {
        "name": "Manpower & Cost Management",
        "code": "M&CM",
        "modules": [
          {
            "code": "MR",
            "name": "Manpower Requisition",
            "submodules": [],
            "features": [
              {
                "name": "Job Requisition from Departmental Manager",
                "description": "Set Job requistion via Departmental Manager"
              },
              {
                "name": "Approval Notification Email",
                "description": "Assign Job Approval Notification via Email"
              },
              {
                "name": "Assigned Approver",
                "description": "Assign Approver to Job Requisition "
              },
              {
                "name": "Requisition for Single & Multiple Post",
                "description": "create requisition for a single or Multiple Job Post"
              },
              {
                "name": "Priority & Deadline setup",
                "description": "Set Priority and Deadline of your deisgnated Job requistion"
              }
            ],
            "description": "Set Requisition for Required Manpower",
            "price": {
              "slab2": 280,
              "slab3": 560,
              "slab4": 840,
              "slab5": 1428.0,
              "slab6": 2840,
              "slab7": 5000
            }
          },
          {
            "code": "MAM",
            "name": "Manpower Allocation",
            "submodules": [],
            "features": [],
            "description": "Allocate your Manpower accordingly",
            "price": {
              "slab1": 200,
              "slab2": 280,
              "slab3": 560,
              "slab4": 840,
              "slab5": 1428.0,
              "slab6": 2840,
              "slab7": 5000
            }
          },
          {
            "code": "ES",
            "name": "Employee Specializations",
            "submodules": [],
            "features": [
              {
                "name": "Employee Specialization",
                "description": "Select from a wide field of filterable options to specialize your employees",
                "price": {
                  "slab2": 280,
                  "slab3": 560,
                  "slab4": 840,
                  "slab5": 1428.0,
                  "slab6": 2840,
                  "slab7": 5000
                }
              }
            ],
            "description": "Set and Manage Employee Specializations according to your business"
          },
          {
            "code": "EXP",
            "name": "Expenditure Reporting",
            "submodules": [],
            "features": [
              {
                "name": "Departmentwise Expenditure",
                "description": "View and Manage your Expenditures in your business as per Departments"
              }
            ]
          },
          {
            "code": "HRCC",
            "name": "Cost Center",
            "submodules": [],
            "features": [
              {
                "name": "Cost Segment Assignment",
                "description": "Assign your Employee to specific Cost Segments"
              },
              {
                "name": "Cost Center Dashboard",
                "description": "View a complete summary of your Cost Centers froma single Dashboard"
              },
              {
                "name": "Cost Center Wise Expense Summary",
                "description": "View a Comprehensive Summary of Cost Center wise Expenses"
              },
              {
                "name": "HR Budgets",
                "description": "Add and View your HR Budgets"
              },
              {
                "name": "HR Cost Center Budgets",
                "description": "Add and View HR Cost Center Budget "
              },
              {
                "name": "Yearly Budget Expense Comparison",
                "description": "Compare Yearly Budget Expenses side by side"
              }
            ],
            "price": {
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          }
        ],
        "description": "Assign and Maintain Manpower & corresponding Costs",
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.M&CM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.M&CM"
          }
        ]
      },
      {
        "name": "Recruitment",
        "code": "R",
        "modules": [
          {
            "code": "REC",
            "name": "Recruitment",
            "submodules": [],
            "features": [
              {
                "name": "Job Template/JD/Job Posting",
                "description": "Create and Manage Job Templates/Descriptions "
              },
              {
                "name": "Candidate Management",
                "description": "Manage applied candidates to your Job Postings"
              },
              {
                "name": "Hiring",
                "description": "Hire your preferred candidate to the specified Job Post as easily as possible"
              }
            ],
            "price": {
              "slab2": 620,
              "slab3": 280,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          },
          {
            "code": "CVB",
            "name": "CV Bank*",
            "submodules": [],
            "features": [],
            "ready": "x",
            "price": {
              "slab2": 280,
              "slab3": 460
            }
          },
          {
            "code": "JPA",
            "name": "Recuitment Job Posting API",
            "submodules": [],
            "features": [],
            "description": "API Integration of Recruitment Job Posting with other parties"
          },
          {
            "code": "CE",
            "name": "Candidate Evaluation",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Written/Viva or other exam Marking Provision",
                "description": "Set and Maintain Written or VIVA or other exam Marking Criterias"
              },
              {
                "name": "Educational marking provision (SSC, HSC, B.Sc, M.Sc, Degree)",
                "description": "Set Marking Standards as per Education Qualifications"
              }
            ],
            "description": "Comprehensive Evalutation of your Candidates",
            "price": {
              "slab2": 420,
              "slab3": 840
            }
          },
          {
            "code": "RECP",
            "name": "Candidate Portal",
            "submodules": [],
            "features": [
              {
                "name": "Online Job Application",
                "description": "Provision to set Online Job Application "
              },
              {
                "name": "Candidate Registration*",
                "description": "Register credentials and Details of your candidates",
                "price": {
                  "slab2": 280,
                  "slab3": 460
                }
              }
            ],
            "description": "One Stop Candidate Dashboard to view all details of a single Candidate",
            "price": {
              "slab2": 940,
              "slab3": 1880
            }
          }
        ],
        "description": "Involved with recuritment process of any organization",
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.R"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.R"
          }
        ]
      },
      {
        "name": "Training Management",
        "code": "TM",
        "modules": [
          {
            "code": "TRS",
            "name": "Training Schedule Management",
            "submodules": [],
            "features": [
              {
                "name": "Training Schedule",
                "description": "Add and View Training Schedules"
              },
              {
                "name": "Training Status",
                "description": "View Training Status"
              },
              {
                "name": "Training Venue",
                "description": "Add Training Venue"
              },
              {
                "name": "Training Organization",
                "description": "Add Training Organization"
              },
              {
                "name": "Timeline & Duration Maintenance",
                "description": "Set and Maintain Training Timeline and Duration "
              },
              {
                "name": "Training Calendar",
                "description": "Add Training Schedule to your Calendar"
              }
            ],
            "description": "Manage Training Schedules",
            "price": {
              "slab2": 280,
              "slab3": 560,
              "slab4": 840,
              "slab5": 1428.0,
              "slab6": 2840,
              "slab7": 5000
            }
          },
          {
            "code": "TRE",
            "name": "Trainee Management",
            "submodules": [],
            "features": [
              {
                "name": "Assign Employee to Trainee",
                "description": "Assign Employee to Trainees"
              },
              {
                "name": "Training Attendance",
                "description": "View Attendance of your Trainees"
              },
              {
                "name": "Training Evaluations",
                "description": "Evaluate your trainees during Training"
              }
            ],
            "description": "Manage your Trainees with ease",
            "price": {
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          },
          {
            "code": "TRC",
            "name": "Training Cost Management",
            "submodules": [],
            "features": [
              {
                "name": "Training Budget",
                "description": "Assign Budget to Training"
              },
              {
                "name": "Budget Expenditure Summary",
                "description": "View entire summary of budget expenditure"
              },
              {
                "name": "Training Vouchers",
                "description": "Add and Maintain Vouchers involved in training"
              },
              {
                "name": "Schedule Wise Training Vouchers",
                "description": "Set Schedule wise Training Vouchers"
              }
            ],
            "description": "Manage all costs and expenses involved in Training",
            "price": {
              "slab2": 280,
              "slab3": 560,
              "slab4": 840,
              "slab5": 1428.0,
              "slab6": 2840,
              "slab7": 5000
            }
          },
          {
            "code": "TRT",
            "name": "Trainer Management",
            "submodules": [],
            "features": [
              {
                "name": "Trainer Management",
                "description": "Add and View Trainers for the training sessions"
              },
              {
                "name": "Training Wise Trainers",
                "description": "View Training Wise Trainers in a single list"
              }
            ],
            "description": "Manage Trainers assigned to training sessions",
            "price": {
              "slab2": 100,
              "slab3": 140,
              "slab4": 280,
              "slab5": 420.0,
              "slab6": 714,
              "slab7": 1420
            }
          },
          {
            "code": "TRA",
            "name": "Training Activities",
            "submodules": [],
            "features": [
              {
                "name": "Training Materials",
                "description": "Add and Manage Materials required in Training"
              },
              {
                "name": "Training Certificate",
                "description": "Add and View Training Certificates"
              }
            ],
            "description": "Involved with Activities related to Training"
          },
          {
            "code": "EAS",
            "name": "Employee Asset Management",
            "submodules": [],
            "features": [
              {
                "name": "Asset Add with ID",
                "description": "Add Asset with the help of Identification Card"
              },
              {
                "name": "Asset Assignment",
                "description": "Assign Assets to your Employees"
              },
              {
                "name": "Asset Release",
                "description": "Release Assets from your Employees"
              },
              {
                "name": "Integration with Asset Management Module",
                "description": "Management of Employee Asset requires Integration with Asset Management Module of PrismERP",
                "price": {
                  "slab2": 100,
                  "slab3": 140,
                  "slab4": 280,
                  "slab5": 420.0,
                  "slab6": 714,
                  "slab7": 1420
                }
              }
            ],
            "description": "Manage assets of your Employees",
            "price": {
              "slab2": 620,
              "slab3": 280,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          }
        ],
        "description": "Assign Training Schedules and other relevant aspects",
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.TM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.TM"
          }
        ]
      },
      {
        "name": "Time and Attendance",
        "code": "TaA",
        "modules": [
          {
            "code": "AM",
            "name": "Attendance Management",
            "submodules": [],
            "features": [
              {
                "name": "General Attendance",
                "description": "View Daily/Weekly/Monthly Attendance (Present/Absent) of your Employees"
              },
              {
                "name": "Daily In-Out Record",
                "description": "View Daily In-Out Attendance Records"
              },
              {
                "name": "Present, Late & Absent Record",
                "description": "View total or Day-wise Present/Late/Absent Records"
              },
              {
                "name": "Record Modification Provision with ACL",
                "description": "Record Modification with Permission "
              },
              {
                "name": "Attendnace Data Manual Entry",
                "description": "Provision to Manually Enter Attendance Data into the Application"
              },
              {
                "name": "Import or Upload Attendance Data",
                "description": "Import or Upload Attendance Device Data with a single click"
              },
              {
                "name": "Attendance Device Integration",
                "description": "Integrate your attendance device to PrismERP"
              },
              {
                "name": "Absent Management",
                "description": "View and Manage Absent Employees",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Handling of Work in Holiday ",
                "description": "Assing how you want to set wokr status for your employees in the holidays",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Time Rounding & Skip Over Information",
                "description": "Round up Time of Working Shifts and Assign Working/Overtime/Extended Hours",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              }
            ],
            "price": {
              "slab1": 50,
              "slab2": 70,
              "slab3": 140,
              "slab4": 210,
              "slab5": 357.0,
              "slab6": 710,
              "slab7": 1250
            }
          },
          {
            "code": "EM",
            "name": "Employee Movement",
            "submodules": [],
            "features": [
              {
                "name": "Employee Movement",
                "description": "Edit Employment Details of your Employees"
              }
            ],
            "price": {
              "slab2": 420,
              "slab3": 840,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          },
          {
            "code": "DI",
            "name": "Device Integration",
            "submodules": [],
            "features": [
              {
                "name": "Post & Unpost Attendance Deivce Data",
                "description": "View both Posted and Unposted Attendance Data from Device"
              },
              {
                "name": "Real Time Device Data Syncronization",
                "description": "Integrated Device is synchronized in Real Time"
              },
              {
                "name": "Unposted Data View",
                "description": "View Unposted Attendances in Device"
              },
              {
                "name": "Attendance Verification Control/Device Verification Control",
                "description": "Get Full Control of Attendance Verification",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              }
            ],
            "description": "Provision of Device Integration with PrismERP",
            "price": {
              "slab1": 70,
              "slab2": 140,
              "slab3": 210,
              "slab4": 357,
              "slab5": 710.0,
              "slab6": 1250,
              "slab7": "?"
            }
          },
          {
            "code": "LTM",
            "name": "Late Manageemnt",
            "submodules": [],
            "features": [
              {
                "name": "Late Employee Leave Deduction Policy",
                "description": "Set Policy for Leave Deduction as per Late Entry"
              },
              {
                "name": "Consecutive & Non-consecutive Late Days",
                "description": "Manage and Set actions for Consecutive and Non-consecutive Late Days"
              },
              {
                "name": "Deducted Leave Type Prorities",
                "description": "Prioritize Deducted Leave types"
              }
            ],
            "description": "Manage Late Attendances and Consequences",
            "price": {
              "slab1": 50,
              "slab2": 70,
              "slab3": 140,
              "slab4": 210,
              "slab5": 357.0,
              "slab6": 710,
              "slab7": 1250
            }
          },
          {
            "code": "OT",
            "name": "Overtime Management",
            "submodules": [],
            "features": [
              {
                "name": "Overtime Management",
                "description": "Manage Overtime Slots and assign Time Range for Overtime"
              },
              {
                "name": "Extra Overtime Management",
                "description": "Assign and Manage Extra Overtime"
              },
              {
                "name": "Overtime Buyer Compliance Report",
                "description": "View a comprehensive report on Overtime Buyer Compliance"
              }
            ],
            "description": "Manage Overtime Actions for your Employees",
            "price": {
              "slab1": 100,
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          },
          {
            "code": "SM",
            "name": "Shift Management",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Shift Management",
                "description": "Add and Set Multiple Shifts "
              },
              {
                "name": "Shift Schedule Management & Status",
                "description": "Set and Manage Shift Schedule and their status"
              },
              {
                "name": "Shift Time Slot Management",
                "description": "Manage Shift Time Slots"
              },
              {
                "name": "Batch shift assignment",
                "description": "Assign Shifts to Batch of Employees",
                "price": {
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              }
            ],
            "description": "Manage Shifts at your organization",
            "price": {
              "slab1": 200,
              "slab2": 280,
              "slab3": 560,
              "slab4": 840,
              "slab5": 1428.0,
              "slab6": 2840,
              "slab7": 5000
            }
          },
          {
            "code": "SR",
            "name": "Shift Roster",
            "submodules": [],
            "features": [
              {
                "name": "Shift Rostering Management",
                "description": "Add and Generate Shift Roster as per your preference"
              },
              {
                "name": "Employee by Shift",
                "description": "Assign and View Employee by Shift Roster"
              },
              {
                "name": "Off Day Shift",
                "description": "Set and Assign Shift Roster to Employees in for Off Days"
              },
              {
                "name": "Roster By Shift Sequences",
                "description": "View and Change Shift Roster by the Sequences"
              }
            ],
            "description": "Create and Manage Shift Rosters",
            "price": {
              "slab2": 420,
              "slab3": 840,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          },
          {
            "code": "SS",
            "name": "Shift Swap",
            "submodules": [],
            "features": [
              {
                "name": "Shift Swapping",
                "description": "Swap Shifts with one to another"
              },
              {
                "name": "Swap Employee",
                "description": "Swap Employees along with Swapping Shifts"
              },
              {
                "name": "Swap Approval",
                "description": "Rigid Layer to verify and approve Shift Swaps"
              },
              {
                "name": "Recommend Shift Swap",
                "description": "Provision to Recommend Shift Swap"
              },
              {
                "name": "Mail Recommendation Shift Swap",
                "description": "Recommend Shift Swap via Mail"
              },
              {
                "name": "Rollback Shift Swap",
                "description": "Rollback Shift Swap as you please"
              }
            ],
            "description": "Swapping Shifts just got easier than ever!",
            "price": {
              "slab1": 100,
              "slab2": 140,
              "slab3": 280,
              "slab4": 420,
              "slab5": 714.0,
              "slab6": 1420,
              "slab7": 2500
            }
          }
        ],
        "description": "Manage Time and Attendance of your employees from a single platform",
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.TaA"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.TaA"
          }
        ]
      },
      {
        "name": "Leave Management System",
        "code": "LMS",
        "modules": [
          {
            "code": "LMS",
            "name": "Leave Management",
            "submodules": [],
            "features": [
              {
                "name": "Leave Policy",
                "description": "Add and Maintain Leave Policies for your organizations"
              },
              {
                "name": "Holiday Management",
                "description": "Set and Manage Holidays "
              },
              {
                "name": "Holiday Calender",
                "description": "Assign Holiday Calendar"
              },
              {
                "name": "Leave Application ",
                "description": "Create Leave Application from Scratch based on a pre-defined Template"
              },
              {
                "name": "Revise Leave Applications",
                "description": "Provision to revise Leave Application"
              },
              {
                "name": "Leave Cancellation",
                "description": "Provision to Cancel Leave Application",
                "price": {
                  "slab2": 210,
                  "slab3": 420,
                  "slab4": 630,
                  "slab5": 1071.0,
                  "slab6": 2130,
                  "slab7": 3750
                }
              },
              {
                "name": "Leave Application Approval",
                "description": "Approval Provision of Leave Application",
                "price": {
                  "slab2": 210,
                  "slab3": 420,
                  "slab4": 630,
                  "slab5": 1071.0,
                  "slab6": 2130,
                  "slab7": 3750
                }
              },
              {
                "name": "Dual Layer of Approval Dual",
                "description": "Provision to Dual Approval Layer",
                "price": {
                  "slab2": 210,
                  "slab3": 420,
                  "slab4": 630,
                  "slab5": 1071.0,
                  "slab6": 2130,
                  "slab7": 3750
                }
              },
              {
                "name": "Employee Wise Policy Assignment",
                "description": "Assign Employee wise Leave Policy",
                "price": {
                  "slab2": 210,
                  "slab3": 420,
                  "slab4": 630,
                  "slab5": 1071.0,
                  "slab6": 2130,
                  "slab7": 3750
                }
              },
              {
                "name": "Partial and Fractional Leave",
                "description": "Provision to select Duration of Leave, partial or fractional or full",
                "price": {
                  "slab2": 210,
                  "slab3": 420,
                  "slab4": 630,
                  "slab5": 1071.0,
                  "slab6": 2130,
                  "slab7": 3750
                }
              }
            ],
            "description": "Manage Leaves of your Employees in a box",
            "price": {
              "slab2": 210,
              "slab3": 420,
              "slab4": 630,
              "slab5": 1071.0,
              "slab6": 2130,
              "slab7": 3750
            }
          },
          {
            "code": "LE",
            "name": "Leave Encashment",
            "submodules": [],
            "features": [
              {
                "name": "Leave Carry Forward Process",
                "description": "Proper and simple carry forward process for Leaves"
              },
              {
                "name": "Encashment Payment Procedure",
                "description": "Manage Payment Procedure for Encashment"
              },
              {
                "name": "Encashment Paid Status",
                "description": "Manage and View the Payment Status of Encashment"
              }
            ],
            "description": "Provision to encash your Employees' Accumulated Leaves"
          },
          {
            "code": "ML",
            "name": "Maternity Leave",
            "submodules": [],
            "features": [
              {
                "name": "Maternity Leave Policy",
                "description": "Customize your very own maternal leave policy "
              },
              {
                "name": "Paternity Leave Policy",
                "description": "Customize your very own paternal leave policy"
              },
              {
                "name": "Billing Processing",
                "description": "Manage Billing Calculation for Maternal/Paternal Leaves"
              },
              {
                "name": "Bill Approval",
                "description": "Rigid Approval Process for Maternity/Paternity Leaves"
              }
            ],
            "description": "Manage Maternity Leave with intricate fields of information",
            "price": {
              "slab2": 200,
              "slab3": 300,
              "slab4": 400,
              "slab5": 500.0,
              "slab6": 600,
              "slab7": 700
            }
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.LMS"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.LMS"
          }
        ]
      },
      {
        "name": "Payroll",
        "code": "P",
        "modules": [
          {
            "code": "EBM",
            "name": "Employee Benefits Management",
            "submodules": [],
            "features": [
              {
                "name": "Payscale and Paygrade Master Data",
                "description": "Add and Manage Payroll Outline and items"
              },
              {
                "name": "Employee Benefits",
                "description": "Assign Benefits to your Employee's Paygrade/Payscale"
              }
            ],
            "description": "Manage Paygrade and Benefits of your Employees"
          },
          {
            "code": "PRSP",
            "name": "Salary Processing",
            "submodules": [],
            "features": [
              {
                "name": "Monthly Salary Processing",
                "description": "Maintain Monthly Salary Processing from a single Portal"
              },
              {
                "name": "Weekly Salary Processing",
                "description": "Maintain Weekly Salary Processing from a single Portal"
              },
              {
                "name": "Hour Base Pay Processing",
                "description": "Maintain Hour Based Salary Processing from a single Portal",
                "price": {
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Production Base Pay Processing",
                "description": "Maintain Salary Processing based on factory production of items",
                "price": {
                  "slab2": 700,
                  "slab3": 1400,
                  "slab4": 2100,
                  "slab5": 3570.0,
                  "slab6": 7100,
                  "slab7": 12500
                }
              },
              {
                "name": "Bank Transfer",
                "description": "Transfer Bank for Payment"
              },
              {
                "name": "Custom Payroll Schedule",
                "description": "Customize employee's Payroll Schedule as per your preferences",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              },
              {
                "name": "Multilingual Payslip",
                "description": "View employee Payslip in Dual Language",
                "price": {
                  "slab2": 280,
                  "slab3": 560,
                  "slab4": 840,
                  "slab5": 1428.0,
                  "slab6": 2840,
                  "slab7": 5000
                }
              }
            ],
            "description": "Manage and Maintain Salary Processing of Employees"
          },
          {
            "code": "PRAM",
            "name": "Monthly Allowance Management",
            "submodules": [],
            "features": [
              {
                "name": "Allowance Master Data Management",
                "description": "Distribute Allowance according to your preference to each employee"
              },
              {
                "name": "Schedule Allowance Entry",
                "description": "Integrate the allowance data to your payroll schedules"
              }
            ],
            "description": "Manage Monthly Allowance Limit as oer your choice for employees"
          },
          {
            "code": "EL",
            "name": "Loan and Advance",
            "submodules": [],
            "features": [
              {
                "name": "Loan & Advance Manager with EMI",
                "description": "Manage Loans and Salary Advances via EMI",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              },
              {
                "name": "Salary Loan Configuration",
                "description": "Configure actions for Salary Loans and Advances"
              },
              {
                "name": "EMI Based Salary Loan",
                "description": "Give Salary Loans based on EMI"
              },
              {
                "name": "Employee Salary Advance",
                "description": "Maintain Employee Salary Advance Applications"
              },
              {
                "name": "Loan Approval Layer",
                "description": "Approve loan applications through an effortless Aproval Layer"
              }
            ],
            "description": "Manage Loans and Salary Advances for Employees"
          },
          {
            "code": "PRP",
            "name": "Payment Processing",
            "submodules": [],
            "features": [
              {
                "name": "Partial / Full Payment",
                "description": "execute payments in partiality/full for employees"
              },
              {
                "name": "Bank Transfer",
                "description": "View comprehensive report on Bank Payment Advice after approval of Payment"
              },
              {
                "name": "Payment Notification*",
                "ready": "x",
                "description": "Get notified of your payments via text/email/pop-up",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              }
            ],
            "description": "Manage Payment Processing of Employee via a wide range of options"
          },
          {
            "code": "BNS",
            "name": "Bonus Payment",
            "submodules": [],
            "features": [
              {
                "name": "Bonus and Benefits",
                "description": "Multi-step process to disburse bonus and benefits to the right employee with zero room for error",
                "price": {
                  "slab1": 300,
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Liability Creation & Payment",
                "description": "Add Liabilty and other relevant data for your convenience"
              },
              {
                "name": "Calculation Slab",
                "description": "A Detailed Calculation Slab designed for a highly accurate Bonus Calculation"
              }
            ],
            "description": "Monitor and Ensure seamless Bonus Payment of Employees"
          },
          {
            "code": "EITAX",
            "name": "Employee Income Tax",
            "submodules": [],
            "features": [
              {
                "name": "Tax Rules Configuratin",
                "description": "Configure Tax Rules as per your preferences",
                "price": {
                  "slab1": 300,
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Salary Tax Calculation",
                "description": "Meticuluous Calculation of Salary Tax"
              },
              {
                "name": "Tax Examption Policy",
                "ready": "x",
                "description": "Set your own policy for Tax Exemption",
                "price": {
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              },
              {
                "name": "Investment Return Manager",
                "ready": "x"
              },
              {
                "name": "Tax Statement",
                "description": "View Comprehensive report on Tax Statement as per Employee"
              },
              {
                "name": "Bangladesh Employee Income Tax Compliance",
                "description": "View Compliance report of Bangladesh Employee Inome Tax",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              }
            ],
            "description": "Manage Income Tax of your Employees"
          },
          {
            "code": "UP",
            "name": "Unscheduled Payments",
            "submodules": [],
            "features": [
              {
                "name": "Reimbursement",
                "description": "Manage reimbursements assigned to your employees with ease"
              },
              {
                "name": "Arrear Payment",
                "description": "Manage Arrear Payment in quick simple steps",
                "price": {
                  "slab1": 100,
                  "slab2": 140,
                  "slab3": 280,
                  "slab4": 420,
                  "slab5": 714.0,
                  "slab6": 1420,
                  "slab7": 2500
                }
              },
              {
                "name": "Pro-rata Basis Payment",
                "description": "Execute your payments in Equivalent Proportions",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Miscellaneous Payment",
                "description": "Manage miscellaneous payments in quick and easy steps"
              }
            ],
            "description": "Manage and disburse Unscheduled Payments"
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.P"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.P"
          }
        ]
      },
      {
        "name": "Fund and Gratuity",
        "code": "FaG",
        "modules": [
          {
            "code": "REF",
            "name": "Refund Mangement",
            "submodules": [],
            "features": [
              {
                "name": "Multiple Refund Policy setup",
                "description": "Customize your very own refund rules as per your company policy"
              },
              {
                "name": "Refund Interest Calculations",
                "description": "Meticulous Calculation process of refund interest"
              },
              {
                "name": "Refund Summary",
                "description": "View a comprehensive Summary of total refunds"
              }
            ],
            "description": "Manage refunds of Employees"
          },
          {
            "code": "PFM",
            "name": "Provident Fund Management",
            "submodules": [],
            "features": [
              {
                "name": "Calculation & Contribution Policy",
                "description": "Set your calculation and contribution policy in multifarious ways"
              },
              {
                "name": "PF Refund Policy",
                "description": "Customize your very own refund rules for PF"
              },
              {
                "name": "PF Calculations Integration with Payroll Process",
                "description": "Integrate PF Calculation with Payroll Process of Employee"
              },
              {
                "name": "Final Settlement Integration",
                "description": "Integrate PF with Final Settlement"
              },
              {
                "name": "Unscheduled PF Calculation",
                "description": "Quick and Simple Steps to Calculate Unscheduled PF",
                "price": {
                  "slab1": 200,
                  "slab2": 280,
                  "slab3": 560,
                  "slab4": 840,
                  "slab5": 1428.0,
                  "slab6": 2840,
                  "slab7": 5000
                }
              }
            ],
            "description": "Your One Stop PF Management Solution",
            "price": {
              "slab1": 300,
              "slab2": 420,
              "slab3": 840,
              "slab4": 1260,
              "slab5": 2142.0,
              "slab6": 4260,
              "slab7": 7500
            }
          },
          {
            "code": "PFL",
            "name": "PF Loan",
            "submodules": [],
            "features": [
              {
                "name": "Interest Based PF Loan",
                "description": "Manage Interest Based PF Loans easily"
              },
              {
                "name": "PF Loan Integration witn Employee Loan",
                "description": "Provision to Integrate PF Loan with Employee Loan"
              }
            ],
            "description": "Manage PF Loans with ease"
          },
          {
            "code": "PFA",
            "name": "PF Accounting",
            "submodules": [],
            "features": [
              {
                "name": "PF Journals",
                "description": "View employee specific PF Journal "
              },
              {
                "name": "Contribution & Expence Account Setup",
                "description": "Configure contribution and Expense Accounts to your preferred acounts"
              },
              {
                "name": "Laps Fund Management",
                "description": "Manage a disparate Lapse Fund in sync with PF "
              }
            ],
            "description": "Set and Monitor PF Accounting Heads"
          },
          {
            "code": "GR",
            "name": "Gratuity",
            "submodules": [],
            "features": [
              {
                "name": "Gratuity Configuration",
                "description": "Configure Calculation of Gratuity according to basic preferences",
                "price": {
                  "slab1": 300,
                  "slab2": 420,
                  "slab3": 840,
                  "slab4": 1260,
                  "slab5": 2142.0,
                  "slab6": 4260,
                  "slab7": 7500
                }
              },
              {
                "name": "Final Settlement Integration",
                "description": "Provision of Viewing Gratuity fund along in FInal Settlement of an employee"
              },
              {
                "name": "Departmentwise Expenditures",
                "description": "Maintain Department Wise Expenditures"
              }
            ],
            "description": "Manage Gratuity Funds with ease"
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.FaG"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.FaG"
          }
        ]
      },
      {
        "name": "Employee Portal",
        "code": "EP",
        "modules": [
          {
            "code": "EMP",
            "name": "Employee Portal",
            "submodules": [],
            "features": [
              {
                "name": "Employee Self Profile",
                "description": "View and manage basic profile information of an employee ",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Online Leave Application",
                "description": "Provision to apply for leave online directly",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Leave Approval of Subordinates",
                "description": "multioptional layer for change status of Leave Application of subrodinates"
              },
              {
                "name": "My Attendance Information",
                "description": "View the employee's attendance day/month wise"
              },
              {
                "name": "My PaySlip",
                "description": "View a full report on the employee's payslip"
              }
            ],
            "description": "One Stop Portal to view and manage all details of an employee"
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.EP"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.EP"
          }
        ]
      },
      {
        "name": "Android App",
        "code": "AA",
        "modules": [
          {
            "code": "AA",
            "name": "Android App",
            "submodules": [],
            "features": [
              {
                "name": "Mobile Attendance",
                "description": "Provision to read Attendance from Mobile"
              },
              {
                "name": "Leave Application",
                "description": "Provision to apply for leave via app"
              },
              {
                "name": "Location Tracking with Attendance",
                "ready": "x",
                "description": "Provision to track location as per attendance"
              },
              {
                "name": "Payslip*",
                "ready": "x"
              }
            ],
            "description": "Maintain and monitor your workforce anywhere, through android Application "
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.AA"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.AA"
          }
        ]
      },
      {
        "name": "Data Migration",
        "code": "DM",
        "modules": [
          {
            "code": "DM",
            "name": "Data Migration Services",
            "submodules": [],
            "features": [
              {
                "name": "Training Information Upload",
                "ready": "x",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Attendance Information Upload",
                "description": "Provision to upload attendance data either manually or via device",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Leave Information Upload",
                "description": "Provision to upload Leave Application from your device",
                "price": {
                  "slab1": 50,
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              }
            ],
            "description": "Provision to upload Employee Information from seperate Database",
            "price": {
              "slab2": 70,
              "slab3": 140,
              "slab4": 210,
              "slab5": 357.0,
              "slab6": 710,
              "slab7": 1250
            }
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.DM"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.DM"
          }
        ]
      },
      {
        "name": "HR Administration",
        "code": "HA",
        "modules": [
          {
            "code": "AT",
            "name": "Audit Trail",
            "submodules": [],
            "features": [
              {
                "name": "Change History of Leave",
                "description": "View and Change History of Leave Applications",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Change History of Payroll",
                "description": "View and Change History of Payroll",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Change History of Salary",
                "description": "View and Change History of Salary",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Change History of Promotion and Transfer",
                "description": "View and Change History of Promotion and Transfer",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Approval History of Leave",
                "description": "View Approval History of Leave Applications",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              },
              {
                "name": "Approval Histroy of Final Settlement",
                "description": "View Approval History of Final Settlements",
                "price": {
                  "slab2": 70,
                  "slab3": 140,
                  "slab4": 210,
                  "slab5": 357.0,
                  "slab6": 710,
                  "slab7": 1250
                }
              }
            ],
            "description": "View and Change History of Attendance",
            "price": {
              "slab2": 70,
              "slab3": 140,
              "slab4": 210,
              "slab5": 357.0,
              "slab6": 710,
              "slab7": 1250
            }
          }
        ],
        "multipliers": [
          {
            "code": "employee",
            "increment": "50",
            "label": "Employee",
            "slabs": [
              50,
              100,
              200,
              500,
              1000.0,
              5000,
              10000
            ],
            "name": "params.employee.HA"
          },
          {
            "code": "branches",
            "increment": "1",
            "label": "Branches",
            "slabs": [
              1,
              2,
              3,
              4,
              5.0,
              6,
              7
            ],
            "name": "params.branches.HA"
          }
        ]
      }
    ]
  }
];

export default data;