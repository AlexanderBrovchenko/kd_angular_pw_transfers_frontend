import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Transfer} from "../models/transfer";
import {catchError, finalize} from "rxjs/operators";
import { TransfersService } from "./transfers.service";

export class TransfersDataSource implements DataSource<Transfer> {

    private transfersSubject = new BehaviorSubject<Transfer[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private transfersService: TransfersService) {  }

    loadTransfers() {

        this.loadingSubject.next(true);

        this.transfersService.findTransfers().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(transfers => this.transfersSubject.next(transfers));

    }

    connect(collectionViewer: CollectionViewer): Observable<Transfer[]> {
        console.log("Connecting data source");
        return this.transfersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.transfersSubject.complete();
        this.loadingSubject.complete();
    }

}