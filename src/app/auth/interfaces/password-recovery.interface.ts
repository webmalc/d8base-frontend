export interface PasswordRecoveryInterface {
    user_id: string;
    timestamp: string;
    signature: string;
    password: string;
}
