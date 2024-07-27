# FlexiQR Backend API Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
   - [QR Code Operations](#qr-code-operations)
   - [Analytics](#analytics)
5. [Data Models](#data-models)
6. [Plugin System](#plugin-system)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)

## Introduction

Welcome to the FlexiQR Backend API documentation. This API allows you to generate customizable QR codes, track their usage, and retrieve detailed analytics. The system is built with Node.js, Express, and MongoDB, utilizing a plugin architecture for extensible analytics processing.

## Base URL

All API requests should be made to:

```
http://localhost:3000/api
```

Replace `localhost:3000` with your server's domain and port in production.

## Authentication

Currently, the API does not require authentication. If you plan to implement authentication in the future, update this section with the required authentication method and any necessary steps or tokens.

## API Endpoints

### QR Code Operations

#### 1. Get QR Code Options

Retrieves available customization options for QR code generation.

- **URL:** `/qr/options`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "shapes": ["square", "rounded"],
      "patterns": ["squares", "dots"],
      "eyeStyles": ["square", "circle"],
      "minSize": 128,
      "maxSize": 512,
      "sizeStep": 8
    }
    ```

#### 2. Generate QR Code

Creates a new QR code with specified parameters.

- **URL:** `/qr`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "text": "https://example.com",
    "shape": "square",
    "fgColor": "#000000",
    "bgColor": "#FFFFFF",
    "eyeColor": "#000000",
    "eyeStyle": "square",
    "pattern": "squares",
    "size": 256,
    "logo": "base64_encoded_image_string" // Optional
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "success": true,
      "id": "d823d21f-5722-4dd4-a982-649592c6efe1"
    }
    ```

#### 3. Get QR Code

Retrieves details of a specific QR code.

- **URL:** `/qr/:id`
- **Method:** `GET`
- **URL Params:** 
  - `id`: The unique identifier of the QR code
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "success": true,
      "data": {
        "id": "d823d21f-5722-4dd4-a982-649592c6efe1",
        "text": "https://example.com",
        "shape": "square",
        "fgColor": "#000000",
        "bgColor": "#FFFFFF",
        "eyeColor": "#000000",
        "eyeStyle": "square",
        "pattern": "squares",
        "size": 256,
        "logo": "base64_encoded_image_string",
        "createdAt": "2023-05-20T10:30:00Z",
        "scans": 42
      }
    }
    ```

### Analytics

#### 4. Get Analytics

Retrieves detailed analytics data for a specific QR code within a given date range.

- **URL:** `/analytics/:id`
- **Method:** `GET`
- **URL Params:**
  - `id`: The unique identifier of the QR code
- **Query Params:**
  - `startDate`: Start date for analytics (format: YYYY-MM-DD)
  - `endDate`: End date for analytics (format: YYYY-MM-DD)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "success": true,
      "data": {
        "totalScans": 1000,
        "dailyScans": {
          "2023-05-20": 150,
          "2023-05-21": 200
        },
        "geographicData": {
          "USA": {
            "total": 500,
            "regions": {
              "California": {
                "total": 200,
                "cities": {
                  "San Francisco": 100,
                  "Los Angeles": 100
                }
              },
              "New York": {
                "total": 300,
                "cities": {
                  "New York City": 250,
                  "Buffalo": 50
                }
              }
            }
          },
          "UK": {
            "total": 500,
            "regions": {
              "England": {
                "total": 400,
                "cities": {
                  "London": 300,
                  "Manchester": 100
                }
              },
              "Scotland": {
                "total": 100,
                "cities": {
                  "Edinburgh": 100
                }
              }
            }
          }
        },
        "deviceTypes": {
          "Mobile": 600,
          "Desktop": 350,
          "Tablet": 50
        },
        "browsers": {
          "Chrome": 500,
          "Safari": 300,
          "Firefox": 200
        },
        "pluginInsights": {
          "geographicInsights": {
            "topCities": [
              { "city": "London", "country": "UK", "count": 300 },
              { "city": "New York City", "country": "USA", "count": 250 }
            ],
            "monthlyTrends": {
              "2023-05": {
                "USA": 250,
                "UK": 250
              },
              "2023-06": {
                "USA": 250,
                "UK": 250
              }
            }
          },
          "deviceInsights": {
            "topDeviceBrowserCombos": [
              { "deviceType": "Mobile", "browser": "Chrome", "count": 300 },
              { "deviceType": "Desktop", "browser": "Chrome", "count": 200 }
            ],
            "monthlyDeviceTrends": {
              "2023-05": {
                "Mobile": 300,
                "Desktop": 175,
                "Tablet": 25
              },
              "2023-06": {
                "Mobile": 300,
                "Desktop": 175,
                "Tablet": 25
              }
            },
            "operatingSystems": {
              "iOS": 300,
              "Android": 300,
              "Windows": 250,
              "MacOS": 100,
              "Linux": 50
            }
          }
        }
      }
    }
    ```

## Data Models

### QR Code

- `id`: String (UUID)
- `text`: String
- `shape`: String (enum: ["square", "rounded"])
- `fgColor`: String (Hex color code)
- `bgColor`: String (Hex color code)
- `eyeColor`: String (Hex color code)
- `eyeStyle`: String (enum: ["square", "circle"])
- `pattern`: String (enum: ["squares", "dots"])
- `size`: Number
- `logo`: String (Base64 encoded image)
- `createdAt`: Date
- `scans`: Number

### Scan

- `qrCodeId`: String (references QR Code id)
- `timestamp`: Date
- `ipAddress`: String
- `userAgent`: String
- `country`: String
- `region`: String
- `city`: String
- `latitude`: Number
- `longitude`: Number
- `deviceType`: String
- `browser`: String

## Plugin System

The analytics system uses a plugin architecture for extensibility. To add new types of analytics:

1. Create a new file in `src/plugins/implementations/`.
2. Implement the `AnalyticsPlugin` interface:

```typescript
import { AnalyticsPlugin } from '../pluginInterface';

const newAnalyticsPlugin: AnalyticsPlugin = {
  name: 'newAnalyticsPlugin',
  processData: async (scans) => {
    // Process scan data and return results
    return { newAnalyticsData: {} };
  }
};

export default newAnalyticsPlugin;
```

3. The plugin will be automatically loaded and its results included in the analytics endpoint response.

## Error Handling

The API uses the following error codes:

- 400: Bad Request – Your request is invalid.
- 404: Not Found – The specified resource could not be found.
- 500: Internal Server Error – We had a problem with our server.

All error responses will have the following structure:

```json
{
  "success": false,
  "message": "Error description here"
}
```

## Best Practices

1. When adding new plugins, ensure they follow the established plugin interface and naming conventions.


---
