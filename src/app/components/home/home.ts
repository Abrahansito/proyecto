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


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ServiceCard, Navbar, Footer, CheckboxModule, AccordionModule, InputTextModule, SelectModule, PaginatorModule, IconFieldModule, InputIconModule, RadioButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  checked: any = null;
  selectedRating: any = null;

  //Variables para paginación
  visibleServices: any[] = []; //Esta es la lista que se ve en pantalla
  first: number = 0;           //Índice del primer elemento
  rows: number = 5;            //Cantidad de elementos por página
  totalRecords: number = 0;    //Total de elementos

  sections = {
    services: true,
    districts: true,
    rating: true,
    payment: true,
    languages: true
  };

  //Opciones de ordenamiento
  sortOptions = [
    { label: 'Más popular', value: 'pop' },
    { label: 'Mejor valorado', value: 'rating' },
    { label: 'Más reciente', value: 'new' },
  ];
  selectedSort: string = 'pop';

  constructor() {}

  //Calculamos el total y mostramos la primera página
  ngOnInit() {
    this.totalRecords = this.allServices.length;
    this.updatePage();
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

  allServices = [
    {
      name: 'Alev Constructores "Complementos para la construcción"',
      title: 'Construcción de viviendas, remodelaciones, ampliaciones entre otros proyectos',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviews: 158,
      verified: true,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • Surco, Miraflores'
    },
    {
      name: 'TechBuild Perú "Técnicos en Construcción Civil"',
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • Lince, Jesús María'
    },
    {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
      name: 'Alev Constructores "Complementos para la construcción"',
      title: 'Construcción de viviendas, remodelaciones, ampliaciones entre otros proyectos',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviews: 158,
      verified: true,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • Surco, Miraflores'
    },
    {
      name: 'TechBuild Perú "Técnicos en Construcción Civil"',
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • Lince, Jesús María'
    },
    {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
      name: 'Alev Constructores "Complementos para la construcción"',
      title: 'Construcción de viviendas, remodelaciones, ampliaciones',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviews: 158,
      verified: true,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • Surco, Miraflores'
    },
    {
      name: 'TechBuild Perú "Técnicos en Construcción Civil"',
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • Lince, Jesús María'
    },
    {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
      name: 'Alev Constructores "Complementos para la construcción"',
      title: 'Construcción de viviendas, remodelaciones, ampliaciones entre otros proyectos',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.9,
      reviews: 158,
      verified: true,
      hours: '2 horas',
      languages: 'Español • Inglés',
      location: 'La Molina • Surco, Miraflores'
    },
    {
      name: 'TechBuild Perú "Técnicos en Construcción Civil"',
      title: 'Especialistas en estructuras y acabados de alta calidad',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop',
      rating: 4.8,
      reviews: 203,
      verified: true,
      hours: '1 hora',
      languages: 'Español • Quechua',
      location: 'San Isidro • Lince, Jesús María'
    },
    {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      },
      {
        name: 'Arquitectura Total "Diseño y Construcción Integral"',
        title: 'Proyectos arquitectónicos completos desde el diseño hasta la ejecución',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300&auto=format&fit=crop',
        rating: 4.7,
        reviews: 89,
        verified: true,
        hours: '4 horas',
        languages: 'Español • Inglés • Francés',
        location: 'Miraflores • Barranco, Chorrillos'
      }
  ];
}
