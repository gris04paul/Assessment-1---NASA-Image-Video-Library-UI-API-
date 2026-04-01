# Test Plan – NASA Image Library

## Objective
To validate UI functionality, API responses, and ensure consistency between UI and API.

---

## Scope (What is Covered)

### UI Testing
- Search functionality
- Opening image details page
- Title visibility validation
- Image load validation (not broken)

### API Testing
- Search API validation
- Asset API validation using NASA ID

### Integration Testing
- Extract NASA ID from UI
- Fetch data from API


---

## Out of Scope (Not Covered)

- Performance testing
- Security testing
- Cross-browser testing
- Mobile responsiveness
- Pagination validation
- Advanced filters

---

## Assumptions
- NASA API is available and stable
- UI structure remains consistent
- First search result is valid

---

## Test Data
- Search keyword: "moon"

---

## Risks
- Dynamic UI content
- API response changes
- Slow network causing delays

---

## Mitigation
- Added waits for elements
- Used stable locators
- Cleaned NASA ID before API call
  
