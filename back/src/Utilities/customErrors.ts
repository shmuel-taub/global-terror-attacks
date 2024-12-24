export class TerrorismManagmentError extends Error {
}

export class ClientsError extends TerrorismManagmentError {
    constructor(msg: string, status: number) {
        super(msg)
        this.status = status
    }
    status: number
}