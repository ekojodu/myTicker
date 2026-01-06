export interface PortfolioHistoryItem {
	date: string;
	cumulative: number;
	cumulative_sp500: number | null;
}

export interface FuturePick {
	ticker: string;
	peg: number;
	roe: number;
	debt_to_equity: number;
	profit_margin: number;
	score: number;
}

export interface DashboardResponse {
	history: PortfolioHistoryItem[];
	future_pick: FuturePick[];
}
