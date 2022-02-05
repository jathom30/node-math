export type TokenSearchResult = {
  id: string
  name: string
  symbol: string
  market_cap_rank?: string
  thumb?: string
  large?: string
}

type Exchanges<T> = {
  aed: T
  ars: T
  aud: T
  bch: T
  bdt: T
  bhd: T
  bmd: T
  bnb: T
  brl: T
  btc: T
  cad: T
  chf: T
  clp: T
  cny: T
  czk: T
  dkk: T
  dot: T
  eos: T
  eth: T
  eur: T
  gbp: T
  hkd: T
  huf: T
  idr: T
  ils: T
  inr: T
  jpy: T
  krw: T
  kwd: T
  lkr: T
  ltc: T
  mmk: T
  mxn: T
  myr: T
  ngn: T
  nok: T
  nzd: T
  php: T
  pkr: T
  pln: T
  rub: T
  sar: T
  sek: T
  sgd: T
  thb: T
  try: T
  twd: T
  uah: T
  usd: T
  vef: T
  vnd: T
  xag: T
  xau: T
  xdr: T
  xlm: T
  xrp: T
  yfi: T
  zar: T
  bits:T
  link:T
  sats:T
}

export type Token = {
  id: string
  symbol: string
  name: string
  asset_platform_id: string
  platforms: {[key: string]: string}
  block_time_in_minutes: number
  categories: string[]
  additional_notices: string[]
  localization: {[key: string]: string}
  description: {[key: string]: string},
  links: {
      homepage: string[],
      blockchain_site: string[],
      official_forum_url: string[],
      chat_url: string[],
      announcement_url: string[],
      twitter_screen_name: string
      telegram_channel_identifier: string
      subreddit_url: string | null,
      repos_url: {
          github: string[],
          bitbucket: string[]
      }
  },
  image: {
      thumb: string
      small: string
      large: string
  },
  country_origin: string
  genesis_date: string | null,
  contract_address: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  market_cap_rank: null,
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: {
      current_price: Exchanges<number>,
      ath: Exchanges<number>,
      ath_change_percentage: Exchanges<number>,
      ath_date: Exchanges<string>,
      atl: Exchanges<number>,
      atl_change_percentage: Exchanges<number>,
      atl_date: Exchanges<string>,
      market_cap: Exchanges<number>,
      market_cap_rank: number | null,
      fully_diluted_valuation: Exchanges<number>,
      total_volume: Exchanges<number>,
      high_24h: Exchanges<number>,
      low_24h: Exchanges<number>,
      price_change_24h: number
      price_change_percentage_24h: number
      price_change_percentage_7d: number
      price_change_percentage_14d: number
      price_change_percentage_30d: number
      price_change_percentage_60d: number
      price_change_percentage_200d: number
      price_change_percentage_1y: number
      market_cap_change_24h: number
      market_cap_change_percentage_24h: number
      price_change_24h_in_currency: Exchanges<number>,
      price_change_percentage_1h_in_currency: Exchanges<number>,
      price_change_percentage_24h_in_currency: Exchanges<number>,
      price_change_percentage_7d_in_currency: Exchanges<number>,
      price_change_percentage_14d_in_currency: Exchanges<number>,
      price_change_percentage_30d_in_currency: Exchanges<number>,
      market_cap_change_24h_in_currency: Exchanges<number>,
      market_cap_change_percentage_24h_in_currency: Exchanges<number>,
      total_supply: number
      max_supply: number
      circulating_supply: number
      last_updated: string
  },
  community_data: {
      facebook_likes: number | null,
      twitter_followers: number
      reddit_average_posts_48h: number
      reddit_average_comments_48h: number
      reddit_subscribers: number
      reddit_accounts_active_48h: number
      telegram_channel_user_count: number | null
  },
  developer_data: {
      forks: number
      stars: number
      subscribers: number
      total_issues: number
      closed_issues: number
      pull_requests_merged: number
      pull_request_contributors: number
      commit_count_4_weeks: number
  },
  last_updated: number
  tickers: 
      {
          base: string
          target: string
          market: {
              name: string
              identifier: string
              has_trading_incentive: false
          },
          last: number
          volume: number
          converted_last: {
              btc: number
              eth: number
              usd: number
          },
          converted_volume: {
              btc: number
              eth: number
              usd: number
          },
          trust_score: number | null,
          bid_ask_spread_percentage: number
          timestamp: string
          last_traded_at: string
          last_fetch_at: string
          is_anomaly: false,
          is_stale: true,
          trade_url: string
          token_info_url: string | null,
          coin_id: string
          target_coin_id: string
      }[]
}