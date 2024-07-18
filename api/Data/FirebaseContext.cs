using System;
using Firebase.Database;
using Firebase.Database.Query;

public class ExpensesService
{
  protected const string FirebaseDatabaseUrl = "https://console.firebase.google.com/u/0/project/keeptrack-5b2d6/database/keeptrack-5b2d6-default-rtdb/data/~2F";
  protected readonly FirebaseClient firebaseClient = new FirebaseClient(FirebaseDatabaseUrl);
}
