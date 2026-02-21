import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceCard } from '../service-card/service-card';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PaginatorModule } from 'primeng/paginator'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ServiceCard, Navbar, Footer, CheckboxModule, AccordionModule, InputTextModule, SelectModule, PaginatorModule, IconFieldModule, InputIconModule, RadioButtonModule, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchServiceText: string = '';
  searchDistrictText: string = '';
  searchLenguageText: string = '';

  //Getter para filtrar Servicios en tiempo real
  get filteredServices() {
      if (!this.searchServiceText) return this.serviceCategories;
      return this.serviceCategories.filter(item =>
          item.label.toLowerCase().includes(this.searchServiceText.toLowerCase())
      );
  }

  //Getter para filtrar Distritos en tiempo real
  get filteredDistricts() {
      if (!this.searchDistrictText) return this.districtCategories;
      return this.districtCategories.filter(item =>
          item.label.toLowerCase().includes(this.searchDistrictText.toLowerCase())
      );
  }

  //Getter para filtrar Idiomas en tiempo real
  get filteredLanguages() {
      if (!this.searchLenguageText) return this.languageCategories;
      return this.languageCategories.filter(item =>
          item.label.toLowerCase().includes(this.searchLenguageText.toLowerCase())
      );
  }


  //checked: any = null;//Variable para almacenar el valor del filtro de verificado (checkbox)
  selectedRating: any = null;//Variable para almacenar el valor del filtro de calificación

  activeFilters: any[] = [];//Lista para almacenar los filtros activos visualmente

  //Variables para mostrar u ocultar secciones del filtro
  showAllServices: boolean = false;//Variable para mostrar u ocultar la sección de servicios
  showAllDistricts: boolean = false;//Variable para mostrar u ocultar la sección de distritos

  //Variable para el filtro de Verificado
  onlyVerified: boolean = false;

  //Variables para paginación
  visibleServices: any[] = []; //Esta es la lista que se ve en pantalla
  first: number = 0;           //Índice del primer elemento
  rows: number = 5;            //Cantidad de elementos por página
  totalRecords: number = 0;    //Total de elementos

  //Objeto para controlar la visibilidad de las secciones del filtro
  sections = {
    services: true,
    districts: true,
    rating: true,
    payment: true,
    languages: true
  };

  //Opciones de ordenamiento
  sortOptions = [
    { label: 'Más popular', value: 'popular' },
    { label: 'Mejor valorado', value: 'rating' },
    { label: 'Más reciente', value: 'recent' },
  ];
  selectedSort: string = 'popular';//Valor por defecto para el ordenamiento

  //Función para aplicar el ordenamiento seleccionado
  applySorting() {
      //Ordenamos el arreglo que actualmente se está mostrando en pantalla
      if (this.selectedSort === 'popular') {
          //Ordena de mayor a menor según la cantidad de valoraciones/reviews
          this.visibleServices.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));

      } else if (this.selectedSort === 'rating') {
          //Ordena de mayor a menor según las estrellas (4.9, 4.8, etc.)
          this.visibleServices.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      } else if (this.selectedSort === 'recent') {
          //Aquí asumo que el arreglo original "allServices" ya está ordenado de más reciente a más antiguo, por lo que simplemente reasigno el orden a visibleServices
          this.visibleServices = [...this.visibleServices].sort((a, b) => {
              const indexA = this.allServices.findIndex(s => s.name === a.name);
              const indexB = this.allServices.findIndex(s => s.name === b.name);
              return indexA - indexB; //Orden original basado en allServices
          });
      }

      //Regresamos a la página 1 después de reordenar
      this.first = 0;
  }


  constructor() {}//El constructor se mantiene vacío, ya que no necesitamos inicializar nada al crear la instancia del componente

  //Calculamos el total y mostramos la primera página
  ngOnInit() {
    this.totalRecords = this.allServices.length;//Calculamos el total de servicios disponibles
    this.updatePage();//Mostramos la primera página de servicios al cargar el componente
  }


//Función para aplicar los filtros seleccionados
applyFilters() {
      //Actualizar la lista de filtros activos para mostrar las etiquetas correspondientes
      this.activeFilters = [];

      //Agregar filtro de verificado si está seleccionado
      if (this.onlyVerified) {
        this.activeFilters.push({ label: 'Solo Verificados', type: 'verified' });
    }

      //Añadir labels de checkboxes marcados
      this.serviceCategories.forEach(c => { if(c.selected) this.activeFilters.push({...c, type: 'service'}); });
      this.districtCategories.forEach(c => { if(c.selected) this.activeFilters.push({...c, type: 'district'}); });
      this.paymentCategories.forEach(c => { if(c.selected) this.activeFilters.push({...c, type: 'payment'}); });
      this.languageCategories.forEach(c => { if(c.selected) this.activeFilters.push({...c, type: 'language'}); });

      //Añadir label de estrellas si hay alguna seleccionada
      if (this.selectedRating) {
          this.activeFilters.push({ label: `${this.selectedRating} estrellas`, type: 'rating' });
      }

      //Filtrar la lista completa de servicios según los filtros seleccionados
      const selServices = this.serviceCategories.filter(c => c.selected).map(c => c.label);
      const selDistricts = this.districtCategories.filter(c => c.selected).map(c => c.label);
      const selPayments = this.paymentCategories.filter(c => c.selected).map(c => c.label);
      const selLanguages = this.languageCategories.filter(c => c.selected).map(c => c.label);

      this.visibleServices = this.allServices.filter(service => {
          // Si no hay nada marcado en la categoría (length === 0), dejamos pasar todos.
          // Si hay algo marcado, verificamos que el servicio coincida.
          const matchService = selServices.length === 0 || selServices.includes(service.title.split(' ')[0]); //Asumo el titulo del servicio
          const matchDistrict = selDistricts.length === 0 || selDistricts.includes(service.location.split(' • ')[0]); //Asumo el distrito del servicio
          const matchPayment = selPayments.length === 0 || selPayments.includes(service.payment); //Asumo el método de pago del servicio
          const matchLanguage = selLanguages.length === 0 || selLanguages.includes(service.languages); //Asumo los idiomas del servicio

          const matchVerified = !this.onlyVerified || service.verified === true;

          return matchService && matchDistrict && matchPayment && matchLanguage && matchVerified && (!this.selectedRating || service.rating >= this.selectedRating);
      });

      this.totalRecords = this.visibleServices.length;
      this.applySorting();//Aplicamos el ordenamiento actual a la lista filtrada

      this.first = 0; // Regresar a página 1
  }

//Función para eliminar un filtro individualmente al hacer clic en la "X" de la etiqueta
removeIndividualFilter(filterToRemove: any) {
      if (filterToRemove.type === 'service') {
          const found = this.serviceCategories.find(c => c.label === filterToRemove.label);
          if (found) found.selected = false;
      } else if (filterToRemove.type === 'district') {
          const found = this.districtCategories.find(c => c.label === filterToRemove.label);
          if (found) found.selected = false;
      } else if (filterToRemove.type === 'payment') {
          const found = this.paymentCategories.find(c => c.label === filterToRemove.label);
          if (found) found.selected = false;
      } else if (filterToRemove.type === 'language') {
          const found = this.languageCategories.find(c => c.label === filterToRemove.label);
          if (found) found.selected = false;
      } else if (filterToRemove.type === 'rating') {
          this.selectedRating = null; // Limpiar radio button
      } else if(filterToRemove.type === 'verified') {
          this.onlyVerified = false; // Limpiar checkbox
      }

      this.applyFilters(); //Recalcular todo
  }

//Función para limpiar todos los filtros de una vez
clearFilters() {
      this.serviceCategories.forEach(c => c.selected = false);
      this.districtCategories.forEach(c => c.selected = false);
      this.paymentCategories.forEach(c => c.selected = false);
      this.languageCategories.forEach(c => c.selected = false);
      this.selectedRating = null;
      this.onlyVerified = false;
      this.applyFilters();
  }




  //Función que se ejecuta al cambiar de página
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePage();

    //Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //Función para actualizar la lista visible según la página actual
  updatePage() {
    this.visibleServices = this.allServices.slice(this.first, this.first + this.rows);
  }

  //Función para mostrar u ocultar secciones del filtro
  toggleSection(sectionName: keyof typeof this.sections) {
    this.sections[sectionName] = !this.sections[sectionName];
  }

  //Lista de categorías de servicios
  serviceCategories = [
    { id: 's1', label: 'Arquitectura y Diseño', count: 245, selected: false },
    { id: 's2', label: 'Carpintería', count: 705, selected: false },
    { id: 's3', label: 'Cerrajería', count: 492, selected: false },
    { id: 's4', label: 'Construcción', count: 1184, selected: false },
    { id: 's5', label: 'Gasfitería', count: 2004, selected: false},
    { id: 's6', label: 'Pintura', count: 350, selected: false },
    { id: 's7', label: 'Electricidad', count: 890, selected: false },
    { id: 's8', label: 'Jardinería', count: 420, selected: false },
    { id: 's9', label: 'Limpieza', count: 650, selected: false },
    { id: 's10', label: 'Transporte', count: 320, selected: false },
  ];

  //Lista de Distritos
  districtCategories = [
      { label: 'Ate', count: 289, selected: false, type: 'district' },
      { label: 'Barranco', count: 1854, selected: false, type: 'district' },
      { label: 'Breña', count: 492, selected: false, type: 'district' },
      { label: 'Carabayllo', count: 1693, selected: false, type: 'district' },
      { label: 'Cercado de Lima', count: 5154, selected: false, type: 'district' }
  ];

  //Lista de Métodos de Pago
  paymentCategories = [
      { label: 'Efectivo', count: 289, selected: false, type: 'payment' },
      { label: 'Transferencia Bancaria', count: 1854, selected: false, type: 'payment' },
      { label: 'POS', count: 1854, selected: false, type: 'payment' },
      { label: 'Billeteras Digitales (Yape, Plin)', count: 492, selected: false, type: 'payment' }
  ];

  //Lista de Idiomas
  languageCategories = [
      { label: 'Español', count: 289, selected: false, type: 'language' },
      { label: 'Quechua', count: 1854, selected: false, type: 'language' },
      { label: 'Aymara', count: 492, selected: false, type: 'language' },
      { label: 'Inglés', count: 1693, selected: false, type: 'language' },
      { label: 'Portugués', count: 5154, selected: false, type: 'language' }
  ];



  //Lista de servicios disponibles
  allServices = [
    {
      name: 'Alev Constructores ',
      lema: "Complementos para la construcción",
      title: 'Construcción de viviendas, remodelaciones, ampliaciones entre otros proyectos',
      image: 'imagen/imagen1_1.jpg',
      rating: 4.9,
      reviews: 158,
      verified: false,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • La Molina, Surco, Miraflores',
      payment: 'Efectivo'
    },
    {
      name: 'TechBuild Perú',
      lema: "Técnicos en Construcción Civil",
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'imagen/imagen2_2.jpg',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • San Isidro, Lince, Jesús María',
      payment: 'Efectivo'
    },
    {
        name: 'Arquitectura Total ',
        lema: "Diseño y Construcción Integral",
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'imagen/imagen3_3.jpg',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Miraflores, Barranco, Chorrillos',
        payment: 'Efectivo'
      },
      {
      name: 'Construye Fácil',
      lema: "Remodelaciones Express",
      title: 'Remodelaciones rápidas y eficientes para hogares y oficinas',
      image: 'imagen/imagen4_4.jpg',
      rating: 4.6,
      reviews: 142,
      verified: true,
      hours: '3 horas',
      languages: 'Español',
      location: 'Surco • Surco, San Borja, Santiago de Surco',
      payment: 'Efectivo'
    },
    {
      name: 'Ingeniería & Proyectos',
      lema: "Ingenieros Civiles Especializados",
      title: 'Cálculo estructural y supervisión de obras civiles',
      image: 'imagen/imagen5_5.jpg',
      rating: 5,
      reviews: 67,
      verified: true,
      hours: '24 horas',
      languages: 'Español • Inglés • Alemán',
      location: 'Lima Centro • Cercado de Lima, Breña, Pueblo Libre',
      payment: 'Transferencia Bancaria'
    },
    {
        name: 'Acabados Premium',
        lema: "Especialistas en Acabados",
        title: 'Trabajos de pintura, drywall y acabados finos',
        image: 'imagen/imagen6_6.jpg',
        rating: 4.5,
        reviews: 178,
        verified: true,
        hours: '2 horas',
        languages: 'Español',
        location: 'San Miguel • San Miguel, Magdalena, Pueblo Libre',
        payment: 'Efectivo'
      },
      {
      name: 'Electricidad Segura',
      lema: "Instalaciones Eléctricas",
      title: 'Instalación y mantenimiento eléctrico residencial e industrial',
      image: 'imagen/imagen7_7.jpg',
      rating: 4.8,
      reviews: 95,
      verified: true,
      hours: '1 hora',
      languages: 'Español',
      location: 'Callao • Callao, Ventanilla, Bellavista',
      payment: 'Efectivo'
    },
    {
      name: 'Fontanería Moderna',
      lema: "Servicios de Fontanería",
      title: 'Reparación e instalación de tuberías y sistemas de agua',
      image: 'imagen/imagen8_8.jpg',
      rating: 4.4,
      reviews: 211,
      verified: true,
      hours: '3 horas',
      languages: 'Español',
      location: 'Comas • Comas, Los Olivos, Independencia',
      payment: 'Efectivo'
    },
    {
      name: 'Techos & Estructuras',
      lema: "Especialistas en Techos",
      title: 'Construcción y reparación de techos de todo tipo',
      image: 'imagen/imagen9_9.jpg',
      rating: 4.7,
      reviews: 123,
      verified: true,
      hours: '6 horas',
      languages: 'Español',
      location: 'Villa El Salvador • Villa El Salvador, Villa María, San Juan de Miraflores',
      payment: 'Efectivo'
      },
      {
      name: 'Pisos & Porcelanatos',
      lema: "Instalación de Pisos",
      title: 'Colocación de porcelanatos, madera y pisos flotantes',
      image: 'imagen/imagen10_10.jpg',
      rating: 4.9,
      reviews: 87,
      verified: true,
      hours: '2 horas',
      languages: 'Español',
      location: 'Barranco • Barranco, Chorrillos, Surco',
      payment: 'Efectivo'
    },
    {
        name: 'Carpintería Artesanal',
        lema: "Muebles a Medida",
        title: 'Diseño y fabricación de muebles de madera personalizados',
        image: 'imagen/imagen11_11.jpg',
        rating: 4.8,
        reviews: 134,
        verified: true,
        hours: '48 horas',
        languages: 'Español • Inglés',
        location: 'San Borja • San Borja, Surco, La Molina',
        payment: 'Efectivo'
      },
      {
        name: 'Vidriería Express',
        lema: "Trabajos en Vidrio",
        title: 'Cortado, instalación y reparación de vidrios y espejos',
        image: 'imagen/imagen12_12.jpg',
        rating: 4.6,
        reviews: 98,
        verified: true,
        hours: '4 horas',
        languages: 'Español',
        location: 'Jesús María • Jesús María, Lince, San Isidro',
        payment: 'Efectivo'
      },
      {
        name: 'Climatización Total',
        lema: "Instalación de Aire Acondicionado",
        title: 'Venta e instalación de sistemas de climatización',
        image: 'imagen/imagen13_13.jpg',
        rating: 4.7,
        reviews: 76,
        verified: true,
        hours: '24 horas',
        languages: 'Español',
        location: 'San Isidro • San Isidro, Miraflores, Surco',
        payment: 'Efectivo'
      },
      {
        name: 'Albañilería Profesional',
        lema: "Trabajos de Albañilería",
        title: 'Construcción de muros, tabiques y obras de albañilería',
        image: 'imagen/imagen14_14.jpg',
        rating: 4.5,
        reviews: 189,
        verified: true,
        hours: '1 día',
        languages: 'Español',
        location: 'Los Olivos • Los Olivos, Comas, Independencia',
        payment: 'Efectivo'
      },
      {
        name: 'Jardinería & Paisajismo',
        lema: "Diseño de Jardines",
        title: 'Diseño, instalación y mantenimiento de áreas verdes',
        image: 'imagen/imagen15_15.jpg',
        rating: 4.9,
        reviews: 112,
        verified: true,
        hours: '3 días',
        languages: 'Español',
        location: 'La Molina • La Molina, Ate, Surco',
        payment: 'Efectivo'
      },
      {
        name: 'Gasfitería Integral',
        lema: "Servicios de Gasfitería",
        title: 'Instalación y reparación de sistemas de gas y agua',
        image: 'imagen/imagen16_16.jpg',
        rating: 4.6,
        reviews: 156,
        verified: true,
        hours: '2 horas',
        languages: 'Español',
        location: 'Magdalena • Magdalena, San Miguel, Pueblo Libre',
        payment: 'Efectivo'
      },
      {
        name: 'Cerrajería Segura',
        lema: "Cerrajería Profesional",
        title: 'Instalación y reparación de cerraduras y sistemas de seguridad',
        image: 'imagen/imagen17_17.jpg',
        rating: 4.8,
        reviews: 92,
        verified: true,
        hours: '1 hora',
        languages: 'Español',
        location: 'Surquillo • Surquillo, San Borja, Miraflores',
        payment: 'Efectivo'
      },
      {
        name: 'Pintura Decorativa',
        lema: "Pintura de Interiores y Exteriores",
        title: 'Trabajos de pintura con técnicas decorativas modernas',
        image: 'imagen/imagen18_18.jpg',
        rating: 4.7,
        reviews: 144,
        verified: true,
        hours: '2 días',
        languages: 'Español • Inglés',
        location: 'Miraflores • Miraflores, Barranco, Chorrillos',
        payment: 'Efectivo'
      },
      {
        name: 'Drywall Expert',
        lema: "Instalación de Drywall",
        title: 'Trabajos en drywall, cielos rasos y tabiquería',
        image: 'imagen/imagen19_19.jpg',
        rating: 4.5,
        reviews: 101,
        verified: true,
        hours: '3 horas',
        languages: 'Español',
        location: 'San Luis • San Luis, La Victoria, Santa Anita',
        payment: 'Efectivo'
      },
      {
      name: 'Impermeabilización Total',
      lema: "Impermeabilización de Techos",
      title: 'Sistemas de impermeabilización para techos y terrazas',
      image: 'imagen/imagen20_20.jpg',
      rating: 4.9,
      reviews: 78,
      verified: true,
      hours: '1 día',
      languages: 'Español',
      location: 'Chorrillos • Chorrillos, Barranco, Surco',
      payment: 'Efectivo'
    },
  ];
}
