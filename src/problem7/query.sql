WITH usd_values AS (
  SELECT
    denom,
    CASE
      WHEN denom = 'usdc' THEN 0.000001
      WHEN denom = 'swth' THEN 0.00000005
      WHEN denom = 'tmz' THEN 0.003
    END AS usd_value
  FROM
    balances
  GROUP BY
    denom
), usd_500 AS (
  SELECT
    address
  FROM
    balances
    JOIN usd_values ON balances.denom = usd_values.denom
  GROUP BY
    address
  HAVING
    SUM(amount * usd_value) >= 500
)
SELECT DISTINCT
  trades.address
FROM
  trades
  JOIN usd_500 ON trades.address = usd_500.address
WHERE
  trades.block_height > 730000