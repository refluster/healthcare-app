export type Wellness = {
    social: number,
    financial: number,
    emotional: number,
    physical: number,
    spiritual: number,
    intellectual: number,
};

export type DailyStats = {
    userId: string;
    date: string;
    wellness: Wellness,
}
