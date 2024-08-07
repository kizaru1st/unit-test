// swagger.js

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Library Management',
    version: '1.0.0',
    contact: {
      name: 'Muhammad Reza Rizki Rahmadi'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  paths: {
    '/api/borrow': {
      post: {
        summary: 'Borrow a book',
        description: 'Borrow a book by providing member code and book code',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['memberCode', 'bookCode'],
                properties: {
                  memberCode: {
                    type: 'string',
                    description: 'Member code'
                  },
                  bookCode: {
                    type: 'string',
                    description: 'Book code'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Book borrowed successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    message: {
                      type: 'string',
                      description: 'Success message'
                    },
                    data: {
                      $ref: '#/components/schemas/Borrow'
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Book borrowed failed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    error: {
                      type: 'string',
                      description: 'Error message'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/members': {
      get: {
        summary: 'Get all members',
        description: 'Get a list of all members',
        responses: {
          '200': {
            description: 'List of members',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Member'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/return': {
      post: {
        summary: 'Return a borrowed book',
        description: 'Return a borrowed book by providing member code and book code',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['memberCode', 'bookCode'],
                properties: {
                  memberCode: {
                    type: 'string',
                    description: 'Member code'
                  },
                  bookCode: {
                    type: 'string',
                    description: 'Book code'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Book returned successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    message: {
                      type: 'string',
                      description: 'Success message'
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Member or book not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    message: {
                      type: 'string',
                      description: 'Error message'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/books': {
      get: {
        summary: 'Get all books',
        description: 'Get a list of all books',
        responses: {
          '200': {
            description: 'List of books',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Success flag'
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Book'
                      }
                    }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Books not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Member: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'Unique identifier for the member'
          },
          name: {
            type: 'string',
            description: 'Name of the member'
          },
          penaltyEndDate: {
            type: 'string',
            format: 'date-time',
            description: 'End date of penalty period, if any',
            nullable: true
          },
          borrow: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Borrow'
            },
            description: 'List of borrows by this member'
          }
        }
      },
      Book: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'Unique identifier for the book'
          },
          title: {
            type: 'string',
            description: 'Title of the book'
          },
          author: {
            type: 'string',
            description: 'Author of the book'
          },
          stock: {
            type: 'integer',
            description: 'Number of copies available'
          },
          borrow: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Borrow'
            },
            description: 'List of borrows for this book'
          }
        }
      },
      Borrow: {
        type: 'object',
        properties: {
          memberCode: {
            type: 'string',
            description: 'Code of the member who borrowed the book'
          },
          bookCode: {
            type: 'string',
            description: 'Code of the borrowed book'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the book was borrowed'
          },
          member: {
            $ref: '#/components/schemas/Member'
          },
          book: {
            $ref: '#/components/schemas/Book'
          }
        }
      }
    }
  }
};

export default swaggerDocument;