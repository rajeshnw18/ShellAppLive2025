class DashboardModel{
    constructor(RAW_AMOUNTINLAKH,RAW_CHANNELNAME,RAW_DATE,StartDate,EndDate,sReport){
        this.RAW_AMOUNTINLAKH = RAW_AMOUNTINLAKH; 
        this.RAW_CHANNELNAME = RAW_CHANNELNAME; 
        this.RAW_DATE = RAW_DATE; 
        this.StartDate = StartDate; 
        this.EndDate = EndDate;
        this.sReport = sReport;
    }
}

module.exports = DashboardModel;