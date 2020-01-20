export interface IpDataResponseInterface {
    ip: string;
    postal: string;
    country_code: string;
    city: string;
    time_zone: {
        name: string,   // The name of the Timezone Eg. "America/Los_Angeles"
        offset: string  // The UTC offset of the Timezone Eg. "-0700"
    };
    currency: {
        code: string
    };
}
