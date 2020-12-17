const data = [
      {
        'code': 'FAM',
        'name': 'Financial Accounting Management',
        'moduleGroups': [
          {
            'name': 'Financial Accounting',
            'modules': [
              {
                'code': 'GL',
                'name': 'General Ledger',
                'description': 'All your ledger books at your fingertips',
                'submodules': [],
                'features': [
                  {
                    'name': 'Ledger Books'
                  },
                  {
                    'name': 'Chart of Accounts'
                  }
                ]
              }
            ]
          },
          {
            'name': 'Cost Accounting',
            'modules': [
              {
                'code': 'CC',
                'name': 'Cost Center',
                'submodules': [],
                'features': [
                  {
                    'name': 'Ledger Books'
                  },
                  {
                    'name': 'Chart of Accounts'
                  }
                ]
              }
            ]
          }

        ]
      },
      {
        'code': 'SDM',
        'name': 'Sales and Distribution Management',
        'moduleGroups': [
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
                        "name": "Trade Discount "
                    },
                    {
                        "name": "Bulk Update General and Trade Discount"
                    },
                    {
                        "name": "Coupon Discount"
                    },
                    {
                        "name": "Promotional Gift  (Gift Voucher)"
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
                        "name": "Customer Credit Limit "
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
                "name": "Secondary Sales ",
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
      }
    ];      

export default data;