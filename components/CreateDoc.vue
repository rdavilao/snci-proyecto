<template>
    <v-card class="mb-5">
        <v-row>
            <v-col cols="6" class="d-flex flex-column justify-center">
                <v-row>
                    <v-col class="text-center">
                        <img src="/icon-note.png" alt="Vuetify.js" style="height: 50px;" />
                        <blockquote class="blockquote" style="font-size: 15px;">
                            &#8220;Share your knowledge. It is a way to achieve immortality.&#8221;
                            <footer>
                                <small>
                                    <em>&mdash;Dalai Lama</em>
                                </small>
                            </footer>
                        </blockquote>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" class="d-flex flex-column justify-center">
                <v-btn @click="dialog = true" variant="tonal">
                    Share your notes !
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
    <v-dialog v-model="dialog" persistent width="1024">
        <v-card>
            <v-card-title>
                <span class="text-h5">Create Publication</span>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                    :items="universities"
                                    label="University*" :rules="[rules.required]" v-model="university"
                                    required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                    :items="degrees"
                                    label="Degree*" :rules="[rules.required]" v-model="degree" required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Subject*" hint="Name of subject" persistent-hint
                                    :rules="[rules.required]" v-model="subject" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Topic*" hint="Name of topi" persistent-hint :rules="[rules.required]"
                                    v-model="topic" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Title*" type="text" :rules="[rules.required]" v-model="title"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Description*" type="text" :rules="[rules.required]" v-model="description"
                                    required></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="document" :rules="[rules.document]"
                                    accept="image/png, image/jpeg, image/bmp, application/pdf,.doc,.docx"
                                    placeholder="Upload your document" prepend-icon="mdi-file-document" label="Document"
                                    required></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*Indicates required field</small>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                    Close
                </v-btn>
                <v-btn :disabled="!valid" color="blue-darken-1" variant="text" @click="addPub()">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapState, storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        const { user } = storeToRefs(userStore)

        return {
            userStore,
            user,
        }
    },
    data: () => ({
        universities: [
            "IE Universidad",
            "Universidad a Distancia de Madrid",
            "Universidad Alfonso X El Sabio",
            "Universidad Antonio de Nebrija",
            "Universidad Autónoma de Barcelona",
            "Universidad Autónoma de Madrid",
            "Universidad Camilo José Cela",
            "Universidad Cardenal Herrera - CEU",
            "Universidad Carlos III de Madrid",
            "Universidad Católica de Ávila",
            "Universidad Católica de Valencia S. Vicente M.",
            "Universidad Católica San Antonio de Murcia",
            "Universidad Complutense de Madrid",
            "Universidad de A Coruña",
            "Universidad de Alcalá",
            "Universidad de Alicante",
            "Universidad de Almería",
            "Universidad de Barcelona",
            "Universidad de Burgos",
            "Universidad de Cádiz",
            "Universidad de Cantabria",
            "Universidad de Castilla-La Mancha",
            "Universidad de Córdoba",
            "Universidad de Deusto",
            "Universidad de Extremadura",
            "Universidad de Girona",
            "Universidad de Granada",
            "Universidad de Huelva",
            "Universidad de Jaén",
            "Universidad de La Laguna",
            "Universidad de La Rioja",
            "Universidad de Las Palmas de Gran Canaria",
            "Universidad de León",
            "Universidad de Málaga",
            "Universidad de Murcia",
            "Universidad de Navarra",
            "Universidad de Oviedo",
            "Universidad de Salamanca",
            "Universidad de Santiago de Compostela",
            "Universidad de Sevilla",
            "Universidad de Valladolid",
            "Universidad de Vic",
            "Universidad de Zaragoza",
            "Universidad del País Vasco",
            "Universidad Europea de Madrid",
            "Universidad Europea Miguel de Cervantes",
            "Universidad Fernando III",
            "Universidad Francisco de Vitoria",
            "Universidad Internacional de Andalucía",
            "Universidad Internacional de Cataluña",
            "Universidad Internacional de la Rioja",
            "Universidad Internacional Menéndez Pelayo UIMP",
            "Universidad Miguel Hernández de Elche",
            "Universidad Mondragon Unibertsitatea",
            "Universidad Nacional de Educación a Distancia U.N.E.D",
            "Universidad Pablo de Olavide",
            "Universidad Politécnica de Cartagena",
            "Universidad Politécnica de Cataluña",
            "Universidad Politécnica de Madrid",
            "Universidad Politécnica de Valéncia",
            "Universidad Pompeu Fabra",
            "Universidad Pontificia Comillas",
            "Universidad Pontificia de Salamanca",
            "Universidad Pública de Navarra",
            "Universidad Ramón Llull",
            "Universidad Rey Juan Carlos",
            "Universidad Rovira i Virgili",
            "Universidad San Jorge",
            "Universidad San Pablo C.E.U.",
            "Universidade de Vigo",
            "Universitat Abat Oliba CEU",
            "Universitat de las Illes Balears",
            "Universitat de Lleida",
            "Universitat de València",
            "Universitat Jaume I de Castellón",
            "Universitat Oberta de Catalunya"
        ],
        degrees: ["Grado Abierto","Grado Abierto en Ciencias Sociales y Jurídicas","Grado Abierto en Ingeniería Industrial","Grado Abierto en Ingenierías","Grado en Administración de Empresas","Grado en Administración de Empresas y Gestión de la Innovación","Grado en Administración y Dirección de Empresas","Grado en Administración y Dirección de Empresas Tecnológicas","Grado en Administración y Gestión Pública","Grado en Análisis de Datos en la Empresa / Business Analytics","Grado en Análisis de Negocios / Business Analytics","Grado en Análisis Económico","Grado en Analítica de Negocios / Business Analytics","Grado en Animación","Grado en Animación & VFX","Grado en Antropología","Grado en Antropología Social","Grado en Antropología Social y Cultural","Grado en Antropología y Evolución Humana","Grado en Arqueología","Grado en Arquitectura","Grado en Arquitectura Naval","Grado en Arquitectura Naval / Ingeniería Marítima","Grado en Arquitectura Naval e Ingeniería Marítima","Grado en Arquitectura Técnica","Grado en Arquitectura Técnica y Edificación","Grado en Arte","Grado en Arte Digital","Grado en Artes","Grado en Artes Digitales","Grado en Artes Escénicas","Grado en Artes Escénicas e Interpretación","Grado en Artes Visuales y Danza","Grado en Artes y Diseño","Grado en Bellas Artes","Grado en Bioinformática","Grado en Bioingeniería","Grado en Biología","Grado en Biología Ambiental","Grado en Biología Humana","Grado en Biología Sanitaria","Grado en Biomedicina","Grado en Biomedicina Básica y Experimental","Grado en Bioquímica","Grado en Bioquímica y Biología Molecular","Grado en Bioquímica y Ciencias Biomédicas","Grado en Biotecnología","Grado en Business Analytics","Grado en Business Data Analytics","Grado en Business Intelligence & Data Analytics","Grado en Ciberseguridad","Grado en Ciencia de Datos","Grado en Ciencia de Datos Aplicada","Grado en Ciencia de Datos e Inteligencia Artificial","Grado en Ciencia de los Datos Aplicada","Grado en Ciencia e Ingeniería de Datos","Grado en Ciencia Política y Administración Pública","Grado en Ciencia Política y Gestión Pública","Grado en Ciencia y Tecnología de los Alimentos","Grado en Ciencia y Tecnología Geográficas","Grado en Ciencia, Gestión e Ingeniería de Servicios","Grado en Ciencia, Tecnología y Humanidades","Grado en Ciencias","Grado en Ciencias Agrarias y Bioeconomía","Grado en Ciencias Ambientales","Grado en Ciencias Biomédicas","Grado en Ciencias Criminológicas y de la Seguridad","Grado en Ciencias Culinarias y Gastronómicas","Grado en Ciencias de Datos","Grado en Ciencias de la Actividad Física y del Deporte","Grado en Ciencias de la Antigüedad","Grado en Ciencias de la Seguridad","Grado en Ciencias de las Religiones","Grado en Ciencias del Mar","Grado en Ciencias del Trabajo, Relaciones Laborales y Recursos Humanos","Grado en Ciencias del Transporte y la Logística","Grado en Ciencias e Ingeniería de Datos","Grado en Ciencias Empresariales","Grado en Ciencias Empresariales - Management","Grado en Ciencias Experimentales","Grado en Ciencias Gastronómicas","Grado en Ciencias Gastronómicas y Gestión Hotelera","Grado en Ciencias Inmobiliarias","Grado en Ciencias Jurídicas de las Administraciones Públicas","Grado en Ciencias Políticas","Grado en Ciencias Políticas y de la Administración","Grado en Ciencias Políticas y de la Administración Pública","Grado en Ciencias Políticas y Gestión Pública","Grado en Ciencias Políticas, Gobierno y Administración Pública","Grado en Ciencias y Lenguas de la Antigüedad","Grado en Ciencias y Tecnologías Aplicadas al Deporte y al Acondicionamiento Físico","Grado en Ciencias y Tecnologías del Mar","Grado en Cine","Grado en Cine y Cultura","Grado en Cine y Ficción Audiovisual","Grado en Cinematografía","Grado en Cinematografía y Artes Audiovisuales","Grado en Comercialización y Logística","Grado en Comercio","Grado en Comercio Internacional","Grado en Comercio y Marketing","Grado en Comportamiento y Ciencias Sociales","Grado en Composición Musical","Grado en Computación e Inteligencia Artificial","Grado en Comunicación","Grado en Comunicación Audiovisual","Grado en Comunicación Audiovisual y Multimedia","Grado en Comunicación Audiovisual y Nuevos Medios","Grado en Comunicación Corporativa, Protocolo y Organización de Eventos","Grado en Comunicación Cultural","Grado en Comunicación de las Organizaciones","Grado en Comunicación Digital","Grado en Comunicación e Industrias Culturales","Grado en Comunicación Interactiva","Grado en Comunicación Publicitaria","Grado en Comunicación y Creación Audiovisual","Grado en Comunicación y Medios Digitales","Grado en Comunicación y Periodismo Audiovisual","Grado en Comunicación y Relaciones Públicas","Grado en Conservación y Restauración de Bienes Culturales","Grado en Conservación y Restauración del Patrimonio Cultural","Grado en Contabilidad y Finanzas","Grado en Contenidos Digitales Interactivos","Grado en Creación Artística para Videojuegos y Juegos Aplicados","Grado en Creación Digital, Animación y Videojuegos","Grado en Creación y Diseño","Grado en Creación y Narración de Videojuegos","Grado en Creación, Administración y Dirección de Empresas","Grado en Criminalística: Ciencias y Tecnologías Forenses","Grado en Criminología","Grado en Criminología y Ciencias de la Seguridad","Grado en Criminología y Políticas Públicas de Prevención","Grado en Criminología y Seguridad","Grado en Danza","Grado en Datos y Analítica de Negocio","Grado en Derecho","Grado en Desarrollo de Videojuegos","Grado en Digital Business, Design and Innovation","Grado en Dirección Comercial y Marketing","Grado en Dirección de Empresas","Grado en Dirección de Empresas en el Ámbito Digital / Digital Business","Grado en Dirección de Empresas Tecnológicas","Grado en Dirección Hotelera","Grado en Dirección Internacional de Empresas de Turismo y Ocio","Grado en Dirección y Gestión de Empresas en el Ámbito Digital","Grado en Dirección y Gestión de Empresas en el Ámbito Digital / Digital Business","Grado en Dirección y Gestión Pública","Grado en Diseño","Grado en Diseño Arquitectónico y Interiorismo","Grado en Diseño Audiovisual e Ilustración","Grado en Diseño de Interiores","Grado en Diseño de Moda","Grado en Diseño de Producto","Grado en Diseño de Videojuegos","Grado en Diseño Digital","Grado en Diseño Digital y Multimedia","Grado en Diseño Digital y Tecnologías Creativas","Grado en Diseño e Innovación","Grado en Diseño Integral y Gestión de la Imagen","Grado en Diseño Multimedia y Gráfico","Grado en Diseño y Creación Digital","Grado en Diseño y Desarrollo de Videojuegos","Grado en Diseño y Desarrollo de Videojuegos y Entornos Virtuales","Grado en Diseño y Desarrollo de Videojuegos y Experiencias Interactivas","Grado en Diseño y Gestión de Moda","Grado en Diseño y Gestión de Proyectos Transmedia","Grado en Diseño y Narración de Animación y Videojuegos","Grado en Diseño y Producción de Videojuegos","Grado en Diseño y Tecnologías Creativas","Grado en Diseño, Animación y Arte Digital","Grado en Economía","Grado en Economía Financiera y Actuarial","Grado en Economía y Finanzas","Grado en Economía y Negocios Internacionales","Grado en Edificación","Grado en Educación Infantil","Grado en Educación Primaria","Grado en Educación Social","Grado en Emprendimiento y Gestión de Empresas","Grado en Empresa Internacional","Grado en Empresa y Tecnología","Grado en Empresas y Actividades Turísticas","Grado en Enfermería","Grado en Enología","Grado en Español, Lengua y Literatura","Grado en Estadística","Grado en Estadística Aplicada","Grado en Estadística Empresarial","Grado en Estadística y Empresa","Grado en Estudios Alemanes","Grado en Estudios Árabes e Islámicos","Grado en Estudios Árabes y Hebreos","Grado en Estudios Clásicos","Grado en Estudios Clásicos y Románicos","Grado en Estudios Culturales","Grado en Estudios de Arquitectura","Grado en Estudios de Asia Oriental","Grado en Estudios de Asia Oriental Chino","Grado en Estudios de Asia Oriental Coreano","Grado en Estudios de Asia Oriental Japonés","Grado en Estudios de Asia Oriental: Chino","Grado en Estudios de Asia Oriental-Japonés","Grado en Estudios de Asia y África: Árabe","Grado en Estudios de Asia y África: Chino","Grado en Estudios de Asia y África: Japonés","Grado en Estudios de Catalán y Español","Grado en Estudios de Comunicación y Medios","Grado en Estudios de Español y Chino: Lengua, Literatura y Cultura","Grado en Estudios de Inglés y Catalán","Grado en Estudios de Inglés y de Clásicas","Grado en Estudios de Inglés y Español","Grado en Estudios de Inglés y Francés","Grado en Estudios en Arquitectura","Grado en Estudios Franceses","Grado en Estudios Francófonos Aplicados","Grado en Estudios Globales","Grado en Estudios Globales / Global Studies","Grado en Estudios Hebreos y Arameos","Grado en Estudios Hispánicos","Grado en Estudios Hispánicos: Lengua Española y sus Literaturas","Grado en Estudios Hispano-Alemanes","Grado en Estudios Ingleses","Grado en Estudios Ingleses: Lengua, Literatura y Cultura","Grado en Estudios Internacionales","Grado en Estudios Italianos","Grado en Estudios Literarios","Grado en Estudios Policiales","Grado en Estudios Portugueses y Brasileños","Grado en Estudios Semíticos e Islámicos","Grado en Estudios Socioculturales de Género","Grado en Estudios Vascos","Grado en Farmacia","Grado en Filología","Grado en Filología Aplicada en Gallego y Español","Grado en Filología Catalana","Grado en Filología Catalana y Estudios Occitanos","Grado en Filología Catalana: Estudios de Literatura i Lingüística","Grado en Filología Clásica","Grado en Filología Hispánica","Grado en Filología Moderna, Inglés","Grado en Filología Moderna: Inglés","Grado en Filosofía","Grado en Filosofía, Política y Economía","Grado en Filosofía, Política, Derecho y Economía","Grado en Finanzas","Grado en Finanzas y Contabilidad","Grado en Finanzas, Banca y Seguros","Grado en Fiscalidad y Administración Pública","Grado en Física","Grado en Física Aplicada","Grado en Física e Instrumentación Espacial","Grado en Fisioterapia","Grado en Fotografía","Grado en Fotografía y Creación Audiovisual","Grado en Fundamentos de Arquitectura","Grado en Fundamentos de Arquitectura y Urbanismo","Grado en Fundamentos de la Arquitectura","Grado en Gallego y Portugués: Estudios Lingüísticos y Literarios","Grado en Gastronomía","Grado en Gastronomía y Artes Culinarias","Grado en Genética","Grado en Geografía","Grado en Geografía e Historia","Grado en Geografía y Gestión del Territorio","Grado en Geografía y Medio Ambiente","Grado en Geografía y Ordenación del Territorio","Grado en Geografía y Planificación Territorial","Grado en Geografía, Análisis Territorial y Sostenibilidad","Grado en Geografía, Desarrollo Territorial y Sostenibilidad","Grado en Geografía, Medio Ambiente y Planificación Territorial","Grado en Geografía, Territorio y Medio Ambiente","Grado en Geología","Grado en Gestión Aeronáutica","Grado en Gestión Aplicada / Applied Management","Grado en Gestión Comercial y Marketing","Grado en Gestión Cultural","Grado en Gestión de Ciudades Inteligentes y Sostenibles","Grado en Gestión de Empresas Hosteleras","Grado en Gestión de Información y Contenidos Digitales","Grado en Gestión de Información y Documentación Digital","Grado en Gestión de la Ciberseguridad","Grado en Gestión de la Información y Contenidos Digitales","Grado en Gestión de Negocios","Grado en Gestión de Pequeñas y Medianas Empresas","Grado en Gestión del Transporte y la Logística","Grado en Gestión del Turismo","Grado en Gestión Deportiva","Grado en Gestión Deportiva / Sport Management","Grado en Gestión Digital de Información y Comunicación","Grado en Gestión Económico-Financiera","Grado en Gestión Empresarial Basada en el Análisis de Datos","Grado en Gestión en Turismo y Hotelería","Grado en Gestión Hotelera y Turística","Grado en Gestión Industrial de la Moda","Grado en Gestión Logística","Grado en Gestión Turística y del Ocio","Grado en Gestión Turística y Hotelera","Grado en Gestión y Administración Pública","Grado en Gestión y Comunicación de la Moda / Fashion Management and Communication","Grado en Gestión y Operaciones del Transporte Aéreo","Grado en Global Communication Management","Grado en Global Governance, Economics & Legal Order","Grado en Historia","Grado en Historia del Arte","Grado en Historia del Arte y Arqueología","Grado en Historia del Arte y Gestión del Patrimonio Artístico","Grado en Historia del Arte y Patrimonio Histórico-Artístico","Grado en Historia y Ciencias de la Música","Grado en Historia y Ciencias de la Música y Tecnología Musical","Grado en Historia y Geografía","Grado en Historia y Patrimonio","Grado en Historia y Patrimonio Histórico","Grado en Historia y Política","Grado en Historia, Geografía e Historia del Arte","Grado en Historia, Política y Economía Contemporáneas","Grado en Humanidades","Grado en Humanidades Digitales Globales","Grado en Humanidades y Estudios Culturales","Grado en Humanidades y Estudios Sociales","Grado en Humanidades y Patrimonio","Grado en Humanidades: Estudios Interculturales","Grado en Humanidades: Historia Cultural","Grado en Información y Documentación","Grado en Informática Industrial y Robótica","Grado en Informática y Servicios","Grado en Ingeniería Aeroespacial","Grado en Ingeniería Aeroespacial en Aeronavegación","Grado en Ingeniería Aeroespacial en Aeronaves","Grado en Ingeniería Aeroespacial en Transporte y Aeropuertos","Grado en Ingeniería Aeroespacial en Vehículos Aeroespaciales","Grado en Ingeniería Agraria","Grado en Ingeniería Agraria y Energética","Grado en Ingeniería Agrícola","Grado en Ingeniería Agrícola y Agroalimentaria","Grado en Ingeniería Agrícola y Agroambiental","Grado en Ingeniería Agrícola y del Medio Rural","Grado en Ingeniería Agroalimentaria","Grado en Ingeniería Agroalimentaria y Agroambiental","Grado en Ingeniería Agroalimentaria y del Medio Rural","Grado en Ingeniería Agroalimentaria y Sistemas Biológicos","Grado en Ingeniería Agroambiental","Grado en Ingeniería Alimentaria","Grado en Ingeniería Ambiental","Grado en Ingeniería Biomédica","Grado en Ingeniería Civil","Grado en Ingeniería Civil en Construcciones Civiles","Grado en Ingeniería Civil y Territorial","Grado en Ingeniería Civil, Especialidad Transportes y Territorio","Grado en Ingeniería de Bioprocesos Alimentarios","Grado en Ingeniería de Ciencias Agronómicas","Grado en Ingeniería de Computadores","Grado en Ingeniería de Comunicaciones Móviles y Espaciales","Grado en Ingeniería de Datos","Grado en Ingeniería de Datos e Inteligencia Artificial","Grado en Ingeniería de Datos en Procesos Industriales","Grado en Ingeniería de Edificación","Grado en Ingeniería de Energías Renovables","Grado en Ingeniería de Energías Renovables y Eficiencia Energética","Grado en Ingeniería de la Automoción","Grado en Ingeniería de la Ciberseguridad","Grado en Ingeniería de la Energía","Grado en Ingeniería de la Energía y Recursos Minerales","Grado en Ingeniería de la Salud","Grado en Ingeniería de la Seguridad","Grado en Ingeniería de las Explotaciones Agropecuarias","Grado en Ingeniería de las Industrias Agrarias y Alimentarias","Grado en Ingeniería de las Tecnologías de la Información Geoespacial","Grado en Ingeniería de los Recursos Energéticos","Grado en Ingeniería de los Recursos Energéticos, Combustibles y Explosivos","Grado en Ingeniería de los Recursos Mineros y Energéticos","Grado en Ingeniería de Materiales","Grado en Ingeniería de Obras Públicas","Grado en Ingeniería de Obras Públicas en Construcciones Civiles","Grado en Ingeniería de Organización","Grado en Ingeniería de Organización Industrial","Grado en Ingeniería de Procesos Químicos Industriales","Grado en Ingeniería de Recursos Minerales","Grado en Ingeniería de Recursos Minerales y su Reciclaje","Grado en Ingeniería de Redes de Telecomunicación","Grado en Ingeniería de Sistemas Aeroespaciales","Grado en Ingeniería de Sistemas Audiovisuales","Grado en Ingeniería de Sistemas Audiovisuales de Telecomunicación","Grado en Ingeniería de Sistemas Audiovisuales y Multimedia","Grado en Ingeniería de Sistemas Biológicos","Grado en Ingeniería de Sistemas de Información","Grado en Ingeniería de Sistemas de Telecomunicación, Sonido e Imagen","Grado en Ingeniería de Sistemas Electrónicos","Grado en Ingeniería de Sistemas TIC","Grado en Ingeniería de Sistemas y Servicios de Telecomunicaciones","Grado en Ingeniería de Sistemas y Tecnología Naval","Grado en Ingeniería de Sonido e Imagen","Grado en Ingeniería de Sonido e Imagen en Telecomunicación","Grado en Ingeniería de Tecnología y Diseño Textil","Grado en Ingeniería de Tecnologías Específicas de Telecomunicación","Grado en Ingeniería de Tecnologías Industriales","Grado en Ingeniería de Tecnologías Mineras","Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación","Grado en Ingeniería del Automóvil","Grado en Ingenieria del Medio Natural","Grado en Ingeniería del Medio Natural","Grado en Ingeniería del Software","Grado en Ingeniería Eléctrica","Grado en Ingeniería Eléctrica y Electrónica","Grado en Ingeniería Electromecánica","Grado en Ingeniería Electrónica","Grado en Ingeniería Electrónica de Comunicaciones","Grado en Ingeniería Electrónica de Telecomunicación","Grado en Ingeniería Electrónica Industrial","Grado en Ingeniería Electrónica Industrial y Automática","Grado en Ingeniería Electrónica y Automática","Grado en Ingeniería Electrónica y Automática Industrial","Grado en Ingeniería Electrónica, Robótica y Mecatrónica","Grado en Ingeniería en Automoción","Grado en Ingeniería en Diseño Industrial","Grado en Ingeniería en Diseño Industrial y Desarrollo del Producto","Grado en Ingeniería en Diseño Mecánico","Grado en Ingeniería en Ecotecnologías en Procesos Industriales","Grado en Ingeniería en Electrónica Industrial","Grado en Ingeniería en Energías Renovables y Eficiencia Energética","Grado en Ingeniería en Explotación de Minas y Recursos Energéticos","Grado en Ingeniería en Geoinformación y Geomática","Grado en Ingeniería en Geomática y Topografía","Grado en Ingeniería en Industria Conectada","Grado en Ingeniería en Mecatrónica","Grado en Ingeniería en Organización de las Tecnologías de la Información y la Comunicación","Grado en Ingeniería en Organización Industrial","Grado en Ingeniería en Sistemas de Información","Grado en Ingeniería en Sistemas de Telecomunicación","Grado en Ingeniería en Sistemas Industriales","Grado en Ingeniería en Sonido e Imagen en Telecomunicación","Grado en Ingeniería en Tecnología de Telecomunicación","Grado en Ingeniería en Tecnología Minera","Grado en Ingeniería en Tecnología Naval","Grado en Ingeniería en Tecnologías Aeroespaciales","Grado en Ingeniería en Tecnologías Ambientales","Grado en Ingeniería en Tecnologías de la Información","Grado en Ingeniería en Tecnologías de la Telecomunicación","Grado en Ingeniería en Tecnologías de Telecomunicación","Grado en Ingeniería en Tecnologías Industriales","Grado en Ingeniería en Tecnologías para Animación y Videojuegos","Grado en Ingeniería en Vehículos Aeroespaciales","Grado en Ingeniería Energética","Grado en Ingeniería Física","Grado en Ingeniería Forestal","Grado en Ingeniería Forestal y del Medio Natural","Grado en Ingeniería Forestal y Medio Rural","Grado en Ingeniería Forestal: Industrias Forestales","Grado en Ingeniería Geológica","Grado en Ingeniería Geomática","Grado en Ingeniería Geomática y Topografía","Grado en Ingeniería Hortofrutícola y Jardinería","Grado en Ingeniería Informática","Grado en Ingeniería Informática - Ingeniería de Computadores","Grado en Ingeniería Informática - Sistemas de Información","Grado en Ingeniería Informática Biomédica","Grado en Ingeniería Informática de Gestión y Sistemas de Información","Grado en Ingeniería Informática de Servicios y Aplicaciones","Grado en Ingeniería Informática del Software","Grado en Ingeniería Informática en Ingeniería de Computadores","Grado en Ingeniería Informática en Ingeniería del Software","Grado en Ingeniería Informática en Sistemas de Información","Grado en Ingeniería Informática en Tecnologías de la Información","Grado en Ingeniería Informática. Tecnologías Informáticas","Grado en Ingeniería Ingeniería Mecánica","Grado en Ingeniería Ingeniería Química","Grado en Ingeniería Marina","Grado en Ingeniería Matemática","Grado en Ingeniería Matemática Aplicada al Análisis de Datos","Grado en Ingeniería Matemática e Inteligencia Artificial","Grado en Ingeniería Matemática en Ciencia de Datos","Grado en Ingeniería Matemática y Física","Grado en Ingeniería Mecánica","Grado en Ingeniería Minera","Grado en Ingeniería Minera y Energética","Grado en Ingeniería Multimedia","Grado en Ingeniería Náutica y Transporte Marítimo","Grado en Ingeniería Naval y Oceánica","Grado en Ingeniería Química","Grado en Ingeniería Química Industrial","Grado en Ingeniería Radioelectrónica","Grado en Ingeniería Robótica","Grado en Ingeniería Robótica Software","Grado en Ingeniería Telemática","Grado en Ingeniería Telemática en Telecomunicación","Grado en Ingeniería y Gestión Empresarial","Grado en Ingeniería y Sistemas de Datos","Grado en Inglés","Grado en Inglés: Estudios Lingüísticos y Literarios","Grado en Innovación en Procesos y Productos Alimentarios","Grado en Innovación y Seguridad Alimentaria","Grado en Inteligencia Artificial","Grado en Inteligencia de Negocios","Grado en Inteligencia de Negocios / Business Intelligence","Grado en Inteligencia y Analítica de Negocios / BIA","Grado en International Business Economics","Grado en Interpretación de Música Moderna","Grado en Interpretación Musical","Grado en Lengua de Signos Española y Comunidad Sorda","Grado en Lengua Española y Literaturas Hispánicas","Grado en Lengua Española y su Literatura","Grado en Lengua Española y sus Literaturas","Grado en Lengua y Cultura Vasca","Grado en Lengua y Literatura Alemanas","Grado en Lengua y Literatura Catalanas","Grado en Lengua y Literatura Española","Grado en Lengua y Literatura Españolas","Grado en Lengua y Literatura Gallegas","Grado en Lengua y Literatura Hispánica","Grado en Lengua y Literatura Hispánicas","Grado en Lengua y Literaturas Españolas","Grado en Lengua y Literaturas Inglesas","Grado en Lenguas Aplicadas","Grado en Lenguas Extranjeras","Grado en Lenguas Modernas","Grado en Lenguas Modernas Aplicadas","Grado en Lenguas Modernas y sus Literaturas","Grado en Lenguas Modernas y Traducción","Grado en Lenguas Modernas, Cultura y Comunicación: Español","Grado en Lenguas Modernas, Cultura y Comunicación: Francés","Grado en Lenguas Modernas, Cultura y Comunicación: Inglés","Grado en Lenguas Románicas y sus Literaturas","Grado en Lenguas y Literaturas Modernas","Grado en Lenguas y Literaturas Modernas - Francés","Grado en Lenguas y Literaturas Modernas, Francés e Inglés","Grado en Lenguas y Literaturas Modernas, Portugués","Grado en Lenguas, Literaturas y Culturas Románicas","Grado en Liderazgo Emprendedor e Innovación","Grado en Lingüística","Grado en Lingüística y Lenguas Aplicadas","Grado en Literatura General y Comparada","Grado en Literaturas Comparadas","Grado en Logística Empresarial","Grado en Logística y Negocios Marítimos","Grado en Logopedia","Grado en Maestro en Educación Infantil","Grado en Maestro en Educación Primaria","Grado en Magisterio en Educación Infantil","Grado en Magisterio en Educación Primaria","Grado en Marina","Grado en Marina Civil. Ingeniería Náutica y Transporte Marítimo","Grado en Marketing","Grado en Marketing e Investigación de Mercados","Grado en Marketing y Comunicación","Grado en Marketing y Comunicación Digital","Grado en Marketing y Comunicación Empresarial","Grado en Marketing y Comunidades Digitales","Grado en Marketing y Dirección Comercial","Grado en Marketing y Gestión Comercial","Grado en Matemática Aplicada y Computación","Grado en Matemática Computacional","Grado en Matemáticas","Grado en Matemáticas Aplicadas","Grado en Matemáticas Computacionales y Analítica de Datos","Grado en Matemáticas e Informática","Grado en Matemáticas y Ciencia de Datos","Grado en Medicina","Grado en Medios Audiovisuales","Grado en Microbiología","Grado en Multimedia","Grado en Multimedia y Artes Digitales","Grado en Multimedia, Aplicaciones y Videojuegos","Grado en Música","Grado en Musicología","Grado en Nanociencia y Nanotecnología","Grado en Náutica y Transporte Marítimo","Grado en Negocio Digital e Innovación en Turismo","Grado en Negocios Internacionales","Grado en Negocios Internacionales / International Business","Grado en Negocios Internacionales (International Business)","Grado en Negocios y Marketing Internacional","Grado en Nutrición Humana y Dietética","Grado en Odontología","Grado en Óptica y Optometría","Grado en Óptica, Optometría y Audiología","Grado en Organización de Eventos, Protocolo y Relaciones Institucionales","Grado en Paisaje","Grado en Paisajismo","Grado en Pedagogía","Grado en Periodismo","Grado en Periodismo y Comunicación Corporativa","Grado en Piloto de Aviación Comercial y Operaciones Aéreas","Grado en Podología","Grado en Políticas de Seguridad y Control de la Criminalidad","Grado en Prevención y Seguridad Integral","Grado en Producción de Música y Sonido para la Industria del Entretenimiento","Grado en Protocolo y Organización de Eventos","Grado en Protocolo y Organización de Eventos y Comunicación Corporativa","Grado en Psicología","Grado en Publicidad","Grado en Publicidad Creativa","Grado en Publicidad y Relaciones Públicas","Grado en Publicidad, Marketing y Relaciones Públicas","Grado en Química","Grado en Recursos Hídricos","Grado en Recursos Humanos y Relaciones Laborales","Grado en Relaciones Internacionales","Grado en Relaciones Internacionales y Unión Europea","Grado en Relaciones Laborales","Grado en Relaciones Laborales y Desarrollo de Recursos Humanos","Grado en Relaciones Laborales y Empleo","Grado en Relaciones Laborales y Ocupación","Grado en Relaciones Laborales y Recursos Humanos","Grado en Robótica","Grado en Seguridad","Grado en Seguridad Pública y Privada","Grado en Seguridad y Control de Riesgos","Grado en Sistemas de Información","Grado en Sociología","Grado en Sociología Aplicada","Grado en Teatro","Grado en Técnicas de Aplicaciones de Software","Grado en Técnicas de Interacción Digital y de Computación","Grado en Técnicas de Interacción Digital y Multimedia","Grado en Tecnología Digital y Multimedia","Grado en Tecnologías de Ingeniería Civil","Grado en Tecnologías Industriales y Análisis Económico","Grado en Tecnologías Interactivas","Grado en Tecnologías Marinas","Grado en Tecnologías para la Sociedad de la Información","Grado en Terapia Ocupacional","Grado en Trabajo Social","Grado en Traducción e Interpretación","Grado en Traducción e Interpretación: Alemán","Grado en Traducción e Interpretación: Alemán, Francés o Lengua de Signos Catalana","Grado en Traducción e Interpretación: Árabe","Grado en Traducción e Interpretación: Francés","Grado en Traducción e Interpretación: Galego-Inglés","Grado en Traducción e Interpretación: Inglés","Grado en Traducción e Interpretación: Inglés-Alemán","Grado en Traducción e Interpretación: Inglés-Francés","Grado en Traducción y Comunicación Intercultural","Grado en Traducción y Mediación Interlingüística: Alemán","Grado en Traducción y Mediación Interlingüística: Francés","Grado en Traducción y Mediación Interlingüística: Inglés","Grado en Traducción, Interpretación y Lenguas Aplicadas","Grado en Turismo","Grado en Turismo y Ocio","Grado en Veterinaria"]
        ,valid: false,
        university: '',
        degree: '',
        subject: '',
        topic: '',
        description: '',
        title: '',
        document: undefined,
        dialog: false
    }),
    computed: {
        rules() {
            return {
                required: (value) => !!value || 'Required',
                document: (v) =>
                    v || 'Document required',
            }
        },
    },
    methods: {
        closeDialog() {
            this.valid = false,
                this.university = '',
                this.degree = '',
                this.subject = '',
                this.topic = '',
                this.description = '',
                this.title = '',
                this.document = undefined,
                this.dialog = false
        },
        addPub() {
            const newPub = {
                author: this.user.uid,
                university: this.university,
                degree: this.degree,
                subject: this.subject,
                topic: this.topic,
                description: this.description,
                title: this.title,
                document: this.document[0],
            }
            this.$emit('addPub', newPub)
            this.dialog = false
        },
    },
};
</script>