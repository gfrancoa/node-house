import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-home-empleado',
  templateUrl: './home-empleado.component.html',
  styleUrls: ['./home-empleado.component.css'],
})
export class HomeEmpleadoComponent implements OnInit {
  public form: FormGroup;
  public tipoMobiliario: AbstractControl;
  public numHabitaciones: AbstractControl;
  public numBanos: AbstractControl;
  public tienePatio: AbstractControl;
  public tieneCocinaIntegral: AbstractControl;
  public piso: AbstractControl;
  public sector: AbstractControl;
  public descripcion: AbstractControl;
  public canon: AbstractControl;
  public foto: AbstractControl;
  public mobiliarios: any[] = []; //lista de empleados. aqui se guardarán los resultados del list
  public selectedId = '';
  public submitted = false;
  public editting = false;
  public token = '';
  public userId = '';
  public ciudades = [];

  //los servicios siempre se llaman en el constructor

  constructor(
    public formBuilder: FormBuilder,
    public config: ConfigService,
    private mobiliarioService: HttpserviceService,
    private authService: AuthService
  ) {
    //se esta construyendo el formulario y se esta colocando
    //que todos los campos son requeridos
    this.form = this.formBuilder.group({
      tipoMobiliario: ['', Validators.required],
      numHabitaciones: ['', Validators.required],
      numBanos: ['', Validators.required],
      tienePatio: ['', Validators.required],
      tieneCocinaIntegral: ['', Validators.required],
      piso: ['', Validators.required],
      sector: ['', Validators.required],
      descripcion: ['', Validators.required],
      canon: ['', Validators.required],
      numInteresados: ['', Validators.required],
      foto: ['', Validators.required],
    });

    //se está asociando las variables con los campos del formulario
    this.tipoMobiliario = this.form.controls['tipoMobiliario'];
    this.numHabitaciones = this.form.controls['numHabitaciones'];
    this.numBanos = this.form.controls['numBanos'];
    this.tienePatio = this.form.controls['tienePatio'];
    this.tieneCocinaIntegral = this.form.controls['tieneCocinaIntegral'];
    this.piso = this.form.controls['piso'];
    this.sector = this.form.controls['sector'];
    this.descripcion = this.form.controls['descripcion'];
    this.foto = this.form.controls['foto'];
    this.canon = this.form.controls['canon'];
  }

  //apenas carga la app lo primero que hará será listar los usuarios en base de datos
  ngOnInit(): void {
    this.token = this.authService.getToken() as string;
    this.userId = this.authService.getUserId() as string;
    this.ciudades = this.mobiliarioService.getCiudades();
    this.list();
  }

  get f() {
    return this.form.controls;
  }

  validacion() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid)
      //el return detiene la ejecución así que si la condicion de invalid se
      //cumple no se ejecutará el método add
      return;
    this.add();
  }

  add() {
    if (this.selectedId) {
      this.commitEdit();
    } else {
      const formValues = {
        ...this.form.value,
        tipo_mobiliario: this.form.get('tipoMobiliario')?.value,
        caracteristicas: {
          num_habitaciones: Number(this.form.get('numHabitaciones')?.value),
          num_baños: Number(this.form.get('numBanos')?.value),
          tiene_patio:
            this.form.get('tienePatio')?.value == 'SI' ? true : false,
          is_cocina_integral:
            this.form.get('tieneCocinaIntegral')?.value == 'SI' ? true : false,
          piso: Number(this.form.get('piso')?.value),
        },
        sector: this.form.get('sector')?.value,
        descripcion: this.form.get('descripcion')?.value,
        canon: Number(this.form.get('canon')?.value),
        user_id: this.userId,
        foto: this.form.get('foto')?.value,
      };
      console.log('form values after casting', formValues);

      this.mobiliarioService
        .createMobiliario(this.token, formValues)
        .subscribe({
          next: (res: any) => {
            if (res.status) {
              console.log('Registro creado', res);
            }
          },
          complete: () => {
            this.list();
          }, // completeHandler
          error: (err) => {
            console.log('Error creating user', err);
          }, // errorHandler
        });
    }
    this.reset();
  }

  reset() {
    this.form.reset();
    this.submitted = false;
    this.editting = false;
  }

  // edit(item: any) {
  //   console.log(item);
  //   this.form.get('document')?.setValue(item.document);
  //   this.form.get('name')?.setValue(item.name);
  //   this.form.get('phone')?.setValue(item.phone);
  //   this.form.get('email')?.setValue(item.email);
  //   this.form.get('salary')?.setValue(item.salary);
  //   this.form.get('isFemale')?.setValue(item.isFemale == true ? 'f' : 'm');
  //   this.form.get('dateOfBirth')?.setValue(item.dateOfBirth);
  //   this.selectedId = item._id;
  //   this.editting = true;
  // }

  // selectGender(value: any) {
  //   console.log('item de select gender', value);

  //   this.form.get('isFemale')?.setValue(value);
  //   console.log('form values', this.form.value);
  // }

  // selectDate(value: any) {
  //   console.log('item de select date', value.target.value);

  //   this.form.get('dateOfBirth')?.setValue(value.target.value);
  // }

  commitEdit() {
    this.editting = false;
    for (let index = 0; index < this.mobiliarios.length; index++) {
      if (this.mobiliarios[index]._id == this.selectedId) {
        this.mobiliarioService
          .updateMobiliario(
            this.token,
            {
              tipo_mobiliario: this.form.get('tipoMobiliario')?.value,

              num_habitaciones: Number(this.form.get('numHabitaciones')?.value),
              num_baños: Number(this.form.get('numBanos')?.value),
              tiene_patio:
                this.form.get('tienePatio')?.value == 'SI' ? true : false,
              is_cocina_integral:
                this.form.get('tieneCocinaIntegral')?.value == 'SI'
                  ? true
                  : false,
              piso: Number(this.form.get('piso')?.value),

              sector: this.form.get('sector')?.value,
              descripcion: this.form.get('descripcion')?.value,
              canon: Number(this.form.get('canon')?.value),

              foto: this.form.get('foto')?.value,
            },
            this.selectedId
          )
          .subscribe({
            next: (res: any) => {
              if (res.status) {
                console.log('response update', res);
              }
            },
            complete: () => {
              this.list();
            }, // completeHandler
            error: () => {
              console.log('Error updating mobiliario');
            }, // errorHandler
          });
      }
    }
    this.selectedId = '';
  }

  delete(_id: string) {
    for (let index = 0; index < this.mobiliarios.length; index++) {
      if (this.mobiliarios[index]._id == _id) {
        this.mobiliarioService.deleteMobiliario(this.token, _id).subscribe({
          next: (res: any) => {
            if (res.status) {
              // this.employees.splice(index, 1)
              console.log('Mobiliario eliminado', res);
            }
          },
          complete: () => {
            this.list();
          }, // completeHandler
          error: () => {
            console.log('Error removing user');
          }, // errorHandler
        });
      }
    }
  }

  list() {
    this.mobiliarioService
      .mobiliarioByEmpleado(this.token, this.userId)
      .subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this.mobiliarios = res;
          }
        },
        complete: () => {
          console.log('Registros listados');
        }, // completeHandler
        error: () => {
          console.log('Error to list registros');
        }, // errorHandler
      });
  }
}
