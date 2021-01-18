import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Transfer} from "../models/transfer";
import {catchError, finalize} from "rxjs/operators";
import { UsersService } from "./users.service";
import { Payee } from "../models/payee";

export class UsersDataSource implements DataSource<Payee> {

    private usersSubject = new BehaviorSubject<Payee[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private usersService: UsersService) {  }

    loadUsers() {

        this.loadingSubject.next(true);

        this.usersService.findUsers().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(users => this.usersSubject.next(users));

    }

    connect(collectionViewer: CollectionViewer): Observable<Payee[]> {
        console.log("Connecting data source");
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

}