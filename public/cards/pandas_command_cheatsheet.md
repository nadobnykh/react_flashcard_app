## Basics

### Explanation:
Import pandas with the alias `pd`.

```python
import pandas as pd
```
---

## Basics

### Explanation:
Create a DataFrame from a dict, list of lists, or other structure.

```python
pd.DataFrame(data)
```
---

## Basics

### Explanation:
Create a one-dimensional labeled array.

```python
pd.Series(data)
```
---

## IO

### Explanation:
Load a CSV file into a DataFrame.

```python
pd.read_csv('file.csv')
```
---

## IO

### Explanation:
Save a DataFrame to a CSV file.

```python
df.to_csv('file.csv')
```
---

## IO

### Explanation:
Load an Excel file into a DataFrame.

```python
pd.read_excel('file.xlsx')
```
---

## IO

### Explanation:
Save a DataFrame as an Excel file.

```python
df.to_excel('file.xlsx')
```
---

## IO

### Explanation:
Load a JSON file into a DataFrame.

```python
pd.read_json('file.json')
```
---

## IO

### Explanation:
Save a DataFrame to a JSON file.

```python
df.to_json('file.json')
```
---

## Exploration

### Explanation:
Show the first `n` rows (default 5).

```python
df.head(n)
```
---

## Exploration

### Explanation:
Show the last `n` rows.

```python
df.tail(n)
```
---

## Exploration

### Explanation:
Display DataFrame summary (non-null counts, dtypes, memory usage).

```python
df.info()
```
---

## Exploration

### Explanation:
Generate descriptive statistics for numerical columns.

```python
df.describe()
```
---

## Exploration

### Explanation:
Return the shape of the DataFrame (rows, columns).

```python
df.shape
```
---

## Exploration

### Explanation:
Return column names.

```python
df.columns
```
---

## Exploration

### Explanation:
Return the index (row labels).

```python
df.index
```
---

## Exploration

### Explanation:
Return data types of columns.

```python
df.dtypes
```
---

## Selection

### Explanation:
Select a single column.

```python
df['col'] or df.col
```
---

## Selection

### Explanation:
Select multiple columns.

```python
df[['col1', 'col2']]
```
---

## Selection

### Explanation:
Select row(s) by label (index name).

```python
df.loc['index_label']
```
---

## Selection

### Explanation:
Select row(s) by numerical index position.

```python
df.iloc[0]
```
---

## Selection

### Explanation:
Filter rows by condition, e.g., column values.

```python
df[df['col'] > 10]
```
---

## Cleaning

### Explanation:
Drop rows with missing (NaN) values.

```python
df.dropna()
```
---

## Cleaning

### Explanation:
Replace missing values with a specified value.

```python
df.fillna(0)
```
---

## Cleaning

### Explanation:
Drop specified column(s).

```python
df.drop(columns=['col'])
```
---

## Cleaning

### Explanation:
Rename column(s).

```python
df.rename(columns={'old':'new'})
```
---

## Cleaning

### Explanation:
Identify duplicate rows; returns a boolean mask.

```python
df.duplicated()
```
---

## Cleaning

### Explanation:
Drop duplicate rows.

```python
df.drop_duplicates()
```
---

## Transformation

### Explanation:
Add a new column from existing ones.

```python
df['total'] = df['a'] + df['b']
```
---

## Transformation

### Explanation:
Apply a function to rows or columns. `axis=0` for columns, `axis=1` for rows.

```python
df.apply(lambda x: x.max(), axis=0)
```
---

## Transformation

### Explanation:
Map a function to each value in a Series (not DataFrame).

```python
df['col'].map(lambda x: x*2)
```
---

## Transformation

### Explanation:
Convert column to another type.

```python
df['col'].astype(int)
```
---

## Transformation

### Explanation:
Replace values using a mapping dict.

```python
df.replace({'old': 'new'})
```
---

## Aggregation

### Explanation:
Sort DataFrame by values in specified column(s).

```python
df.sort_values('col')
```
---

## Aggregation

### Explanation:
Group by a column, then compute mean (or other function). Example: `df.groupby('Dept').mean()` groups by department.

```python
df.groupby('group_col').mean()
```
---

## Aggregation

### Explanation:
Aggregate multiple functions per column. Example: `df.agg({'salary': ['min', 'max']})` gives min/max salary.

```python
df.agg({'col': ['min', 'max']})
```
---

## Aggregation

### Explanation:
Create a pivot table (summarizes data). Example: `df.pivot_table(values='sales', index='region', columns='product')`.

```python
df.pivot_table(values='val', index='row', columns='col')
```
---

## Math

### Explanation:
Calculate mean of numeric columns.

```python
df.mean()
```
---

## Math

### Explanation:
Calculate sum of numeric columns.

```python
df.sum()
```
---

## Math

### Explanation:
Compute pairwise correlation of columns.

```python
df.corr()
```
---

## Math

### Explanation:
Count unique values and frequencies in a Series.

```python
df['col'].value_counts()
```
---

## Joining

### Explanation:
Concatenate DataFrames (e.g., stacking rows). Example: `pd.concat([df1, df2])` vertically stacks two DataFrames.

```python
pd.concat([df1, df2])
```
---

## Joining

### Explanation:
Merge two DataFrames using a common key. Example: `pd.merge(df1, df2, on='id', how='inner')`.

```python
pd.merge(df1, df2, on='key')
```
---

## Joining

### Explanation:
Join DataFrames on index. Example: `df1.join(df2)` assumes both DataFrames have aligned indices.

```python
df1.join(df2)
```
---

## Indexing

### Explanation:
Set a column as the index.

```python
df.set_index('col')
```
---

## Indexing

### Explanation:
Reset index to default integer index.

```python
df.reset_index()
```
---

## Indexing

### Explanation:
Sort DataFrame by index.

```python
df.sort_index()
```
---
