# Hospital Frontend

## - Angular 8
## - Angular Material

Web application for monitoring the admission department of a hospital.

There are three roles in the system: administrator(A), doctor(D), and patient(P).

- (A) User registration in the system
- (A) Scheduling doctors (characterized by date, time period and office)
- (A, P) recording / editing a recording / deleting an appointment
- (A) View the general schedule of doctors
- (D) View your schedule
- (P) View your visit history and patient card
- (D) View the patient card and make new entries in it, for patients made an appointment.
- (D) Record of the current patient (who was now at the appointment or was there for an hour at the appointment with another doctor)
- (All) Editing user contact details

The following requirements are imposed:

Each doctor has one or more specialties (e.g. therapist, surgeon, neurologist).
Each specialty has an “average patient appointment time” (for example, 30 minutes), so the whole schedule is divided into such time slots.
A doctor cannot appear simultaneously in two or more schedules.
The patient cannot be recorded retroactively (but at the same time can be recorded in any slot if it is free and has not ended).

In addition, special shifts are implemented in the system without doctors and time slots, for example - blood test, other medical procedures.
