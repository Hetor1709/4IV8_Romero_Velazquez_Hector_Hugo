import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.Period;

public class ExamenPrimerParcial {
    //El examen que hice fue el C pq por estaba sentado con los del C
    //Romero Velázquez Héctor Hugo      4IV8
    //PS el program
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        boolean reiniciar;
        do {
            reiniciar = false;
            ArrayList<Integer> arregloNumeros = new ArrayList<>();

            System.out.println("Ingresa números (presiona 0 para terminar):");

            while (true) {
                String entrada = scanner.nextLine();
                if (entrada.equals("0")) {
                    break;
                }
                try {
                    arregloNumeros.add(Integer.parseInt(entrada));
                } catch (NumberFormatException e) {
                    System.out.println("Entrada inválida, intenta de nuevo.");
                }
            }

            System.out.println("Números ingresados:     " + arregloNumeros);

            if (arregloNumeros.isEmpty()) {
                System.out.println("No se ingresaron números.");
                return;
            }

            // Calcular media
            double suma = 0;
            for (int numero : arregloNumeros) {
                suma += numero;
            }
            double promedio = suma / arregloNumeros.size();

            // Mediana
            Collections.sort(arregloNumeros);
            double mediana;
            int tamano = arregloNumeros.size();
            if (tamano % 2 == 0) {
                mediana = (arregloNumeros.get(tamano / 2 - 1) + arregloNumeros.get(tamano / 2)) / 2.0;
            } else {
                mediana = arregloNumeros.get(tamano / 2);
            }

            // Moda
            int moda = calcularModa(arregloNumeros);

            System.out.println("Media: " + promedio);
            System.out.println("Mediana: " + mediana);
            if (moda == -1) {
                System.out.println("No hay moda");
            } else {
                System.out.println("Moda: " + moda);
            }

            // Solicitar datos personales
            System.out.print("Ingresa tu nombre completo: ");
            String nombre = scanner.nextLine();

            System.out.print("Ingresa tu fecha de nacimiento (dd/MM/yyyy): ");
            String cadenaFecha = scanner.nextLine();

            try {
                DateTimeFormatter formateadorFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                LocalDate fechaNacimiento = LocalDate.parse(cadenaFecha, formateadorFecha);
                LocalDate hoy = LocalDate.now();
                Period periodoEdad = Period.between(fechaNacimiento, hoy);
                int edadCalculada = periodoEdad.getYears();

                if (edadCalculada < 0) {
                    System.out.println("Fecha futura inválida.");
                } else if (edadCalculada < 18) {
                    System.out.println("El programa no puede ser utilizado por menores de edad.");
                } else {
                    System.out.println("Bienvenido, " + nombre + ". Tu edad es: " + edadCalculada);
                    System.out.print("¿Deseas volver al inicio? (s/n): ");
                    String respuesta = scanner.nextLine();
                    if (respuesta.equalsIgnoreCase("s")) {
                        reiniciar = true;
                    }
                }
            } catch (Exception e) {
                System.out.println("Fecha inválida.");
            }
        } while (reiniciar);

        scanner.close();
    }

    private static int calcularModa(ArrayList<Integer> lista) {
        int maximoConteo = 0;
        int valorModa = -1;
        for (int i = 0; i < lista.size(); i++) {
            int conteo = 0;
            for (int j = 0; j < lista.size(); j++) {
                if (lista.get(j).equals(lista.get(i))) {
                    conteo++;
                }
            }
            if (conteo > maximoConteo) {
                maximoConteo = conteo;
                valorModa = lista.get(i);
            }
        }
        if (maximoConteo <= 1) {
            return -1;
        }
        return valorModa;
    }
}
