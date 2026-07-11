

def handleNullvalues(df):
    before = len(df)
    # Drop rows missing values
    df = df.dropna()

    removed = before - len(df)
    print(f"Removed {removed} rows with missing data")
    print(f"Remaining: {len(df)}")  

