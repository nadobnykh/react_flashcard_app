## Step 1 – Set up the environment

### 1a. How do you create a virtual environment in Python?

**Terminal:** 

`python -m venv .venv`

---

### 1b. How do you activate a virtual environment?

**Terminal:** 

`source .venv/bin/activate` 

on Unix/Mac or 

`.venv\Scripts\activate` 

on Windows.

---

### 1c. How do you install required packages for a Taipy project?

**Terminal:**

```bash
pip install --upgrade pip
pip install taipy pandas plotly
```

---

## Step 2 – Prepare your CSV

### 2a. How do you download the Penguins dataset as a CSV?

**Terminal:**

`curl -o data.csv https://raw.githubusercontent.com /mwaskom/seaborn-data/master/penguins.csv`

---

### 2b. How do you confirm the CSV file is in the correct location?

Ensure `data.csv` exists in your project folder (where `main.py` resides).

---

## Step 3 – Create a minimal Taipy app

### 3a. How do you create a simple Taipy GUI application?

**File: `main.py`**

```python
from taipy.gui import Gui
page = "# Hello Taipy!"
Gui(page).run()
```

---

### 3b. How do you run a Taipy app?

**Terminal:** 

`python main.py`

---

## Step 4 – Load the CSV

### 4a. How do you import pandas?

**File: `main.py`**

Add `import pandas as pd` at the top of your script.

---

### 4b. How do you load a CSV file into a DataFrame?

**File: `main.py`**

Use `df = pd.read_csv("data.csv")`

---

## Step 5 – Display the table

### 5a. How do you display a DataFrame in Taipy?

**File: `main.py`**

Use `<|{df}|table|>` inside the Markdown page string.

---

### 5b. How do you render the table in the browser?

**File: `main.py`**

Wrap the page string in `Gui(page).run()` and run the script.

---

## Step 6 – Add filtering controls

### 6a. How do you define state variables in Taipy?

**File: `main.py`**

Declare: `selected_col = df.columns[0]`, `filter_value = ""`, `view = df.copy()`.

---

### 6b. How do you define a filtering method in Taipy?

**File: `main.py`**

```python
def on_filter(state):
    mask = state.df[state.selected_col]
    .astype(str).str.contains(
        state.filter_value, case=False, na=False
    )
    state.view = state.df[mask]
```

---

### 6c. How do you add filter UI controls to the page?

**File: `main.py`**

```markdown
<|layout|columns=1 1|
Select column: 
<|{selected_col}|selector|lov={list(df.columns)}|>
Filter: <|{filter_value}|input|>
|>
<|{view}|table|>
<|on_filter|method|>
```

---

## Step 7 – Add Plotly chart

### 7a. How do you import Plotly Express?

**File: `main.py`**

Add `import plotly.express as px`

---

### 7b. How do you define a function to generate a chart?

**File: `main.py`**

```python
def make_fig(state):
    return px.scatter(
        state.view,
        x="bill_length_mm",
        y="bill_depth_mm",
        color="species",
        title="Bill metrics"
    )
```

---

### 7c. How do you integrate chart creation into the filter method?

**File: `main.py`**

Update `on_filter()`:

```python
state.view = state.df[mask]
state.fig = make_fig(state)
```

---

### 7d. How do you add the chart to the UI?

**File: `main.py`**

Declare the figure and use `<|{fig}|chart|>` in the page.

---

## General Taipy Concepts

### G1. What does `Gui(page).run()` do?

It launches a local server and renders the Taipy UI defined in the page.

---

### G2. Can you use multiple pages in Taipy?

Yes, pass a dictionary to `Gui(pages={...})` and navigate with `<|navigate|>`.

---

### G3. What components can be used in Taipy markdown?

Tables, charts, inputs, selectors, buttons, sliders, and more using `<|...|>` syntax.

---

## CSV + Pandas Integration

### P1. What does `pd.read_csv()` return?

It returns a `pandas.DataFrame` object.

---

### P2. Why use `astype(str)` before filtering?

To ensure all values are treated as strings for `.contains()` filtering.

---

### P3. What is the purpose of `na=False` in `.contains()`?

It prevents errors when filtering columns with `NaN` values.

---

## Taipy Interactivity + State

### S1. How do you bind a UI input to a Python variable?

Use syntax like `<|{variable_name}|input|>`.

---

### S2. What is the `state` object in a Taipy method?

It's a special object that gives access to all reactive variables.

---

### S3. Why avoid global variables in Taipy methods?

Because each user has a separate state context — global variables would break this model.

---

### S4. When is a Taipy method executed?

When referenced in the UI (e.g., `<|method_name|method|>`) or called interactively.

---

## Plotly Integration

### C1. How do you create a scatter chart with Plotly Express?

**File: `main.py`**

Use `px.scatter(df, x=..., y=...)`

---

### C2. How do you show a Plotly chart in Taipy?

**File: `main.py`**

Bind the figure to a variable and use `<|{fig}|chart|>` in the page.

---

### C3. What happens if `fig` is `None`?

The chart component will not render and may show an error.

---

## Error Handling & Best Practices

### E1. How do you handle missing data in a CSV?

Use `dropna()` to remove rows or `fillna()` to replace them.

---

### E2. How do you avoid filter errors on numeric columns?

Convert columns to string using `.astype(str)` before filtering.

---

### E3. How do you debug state variables in Taipy?

Use `print(state.variable)` in your methods and check the terminal output.

---

## Bonus UX Features

### U1. How do you reset filters in a Taipy app?

**File: `main.py`**

Create a reset button that clears inputs and re-runs `on_filter()`.

---

### U2. How can users upload their own CSV file?

**File: `main.py`**

Use `<|{uploaded_file}|file|extensions=.csv|>` and load it in a method.

---

### U3. How do you let users export filtered data?

**File: `main.py`**

Call `view.to_csv("output.csv")` and provide a download link or button.

---
