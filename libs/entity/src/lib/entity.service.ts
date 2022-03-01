import { IEntity } from './i.entity'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators'

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
const httpOptions = {
  observe: 'body',
  responseType: 'json'
}

/**
 * Generic service class for communicating objects to/from services.
 * Serves generic CRUD operations.
 */
export class EntityService<T extends IEntity> {
  /**
   * Service constructor.
   */
  constructor(
    protected readonly http: HttpClient,
    public readonly url: string,
    public readonly endpoint: string
  ) { }

  /**
   * Get all items.
   *
   * @options options
   */
  public list(options?: any): Observable<T[] | null> {
    const endpoint = `${this.url}${this.endpoint}`
    console.log(`list ${endpoint}`)
    return this.http.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      map((response: any) => response.result),
      catchError(this.handleError)
    )
  }

  /**
   * Create the item at the service.
   *
   * @param item Item to be created.
   */
  public create(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}`
    console.log(`create ${endpoint}`)
    return this.http
      .post<T>(endpoint, item, { ...options, ...httpOptions })
      .pipe(
        // tap(console.log),
        // map((response: any) => response.result),
        catchError(this.handleError)
      )
  }

  /**
   * Get a single item from the service.
   *
   * @param id ID of the item to get.
   */
  public read(id: string | null, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${id}`
    console.log(`read ${endpoint}`)
    return this.http.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      tap(console.log),
      map((response: any) => response.result),
      catchError(this.handleError)
    )
  }

  /**
   * Update (put) new info.
   *
   * @param item The new item.
   */
  public update(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${item.id}`
    console.log(`update ${endpoint}`)
    return this.http.put(endpoint, item, { ...options, ...httpOptions }).pipe(
      map((response: any) => response.result),
      catchError(this.handleError)
    )
  }

  /**
   * Delete an item at the service.
   *
   * @param id ID of item to be deleted.
   */
  public delete(id: string, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${id}`
    console.log(`delete ${endpoint}`)
    return this.http.delete(endpoint, { ...options, ...httpOptions }).pipe(
      // map((response: any) => response.result),
      catchError(this.handleError)
    )
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message
    }
    // return an error observable with a user-facing error message
    return throwError(errorResponse)
  }
}
