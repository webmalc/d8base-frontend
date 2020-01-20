export interface IpApiResponseInterface {
    ip: string;
    postal: string;
    error: string;
    city: string;
    country: string;
    timezone: string;        //	timezone (IANA format i.e. “Area/Location”)
    utc_offset: string;      //	UTC offset as +HHMM or -HHMM (HH is hours, MM is minutes)
}
